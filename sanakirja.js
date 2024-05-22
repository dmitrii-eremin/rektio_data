/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const stripTags = originalString => originalString.replace(/(<([^>]+)>)/gi, "");

const parseGroup = (group) => {
    return {
        name: stripTags(group.name),
        subgroups: group.subgroups.map(s => s.forms.map(x => {
            return {
                name: stripTags(x.name),
                value: x.value.map(ff => stripTags(ff))
            };
        })).flat()
    };
};

const parseExamples = (sense) => {
    return sense.examples.map(e => stripTags(e.text));
};

const parseSenses = (sense) => {
    return {
        meta: {
            name: stripTags(sense.senseName),
            definitions: sense.definitions.map(x => stripTags(x.definition)),
            examples: parseExamples(sense)
        }
    };
};

const parseObject = (data) => {
  return data.map(item => {
      return {
          word: stripTags(item.clean_headword),
          senses: item.senses.map(s => {
              let mainSense = [parseSenses(s)];
              if (s.senses && s.senses.length > 0) {
                  const moreSenses = s.senses.map(x => parseSenses(x));
                  mainSense.push(...moreSenses);
              }
              return mainSense;
          }).flat(),
          groups: item.inflection_groups.map(group => group.groups.map(g => parseGroup(g))).flat()
      };
  });
};

const getMaxWidthForSG = (subgroups) => {
  const foo = subgroups.map(sg => sg.value.join(", "));
  return 3 + foo.reduce((acc, val) => {
      return Math.max(acc, val.length);
  }, 0);
};

const getSgValueWithWidthSpace = (sg, maxw) => {
  const res = sg.value.join(", ");
  var postfix = new Array(maxw - res.length).join(" ");
  return res + postfix;
};

const convertSense = (sense, idx) => {
  const definition = (idx + 1) + ") " + sense.meta.definitions.join("\n");

  const examples = sense.meta.examples.map(x => "   " + x).join("\n");

  return definition + examples + "\n";
};

const convertObject = (definition) => {
  var lines = [definition.word, ''];
  
  var cases = definition.groups.map(gr => {
      const spaceInB = getMaxWidthForSG(gr.subgroups);
      return gr.subgroups.map(sg => getSgValueWithWidthSpace(sg, spaceInB) + sg.name).join("\n");
  });
  lines.push(...cases);

  lines.push('');

  var senses = definition.senses
      .filter(sense => sense.meta.definitions.length > 0 || sense.meta.examples.length > 0)
      .map(convertSense);
  lines.push(...senses);

  return lines.join("\n");
};

let getAccessToken = async() => {
  const response = await fetch("https://www.kielitoimistonsanakirja.fi/api/auth/anon-login", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
      }
    });
    const jsonData = await response.json();
    return jsonData["access_token"];
};

let getData = async(accessToken, word) => {
  const url = "https://www.kielitoimistonsanakirja.fi/api/search/api/v1/search?keyword=" + encodeURI(word);
  const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Authorization": "Bearer " + accessToken,
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
      }
    });
    if (response.status === 404) {
      return {
        good: false,
        content: `Слово ${word} не найдено.`
      };
    }
    else if (response.status !== 200) {
      return {
        good: false,
        content: `HTTP Status: ${response.status}`
      };
    }
    const jsonData = await response.json();
    return { good: true, content: jsonData };
};

function splitter(str, l){
  var strs = [];
  while(str.length > l){
      var pos = str.substring(0, l).lastIndexOf(' ');
      pos = pos <= 0 ? l : pos;
      strs.push(str.substring(0, pos));
      var i = str.indexOf(' ', pos)+1;
      if(i < pos || i > pos+l)
          i = pos;
      str = str.substring(i);
  }
  strs.push(str);
  return strs;
}

export default {
  async fetch(request, env, ctx) {
      if(request.method === "POST"){
          const payload = await request.json();
          if('message' in payload){
            const chatId = payload.message.chat.id;
            const word = String(payload.message.text);

            try {
            
              const accessToken = await getAccessToken();
              const data = await getData(accessToken, word);
              if (!data.good) {
                await this.sendMessage(env.API_KEY, chatId, data.content);
              }
              else {
                const objects = parseObject(data.content);
                const strings = objects.map(convertObject);

                for (var i = 0; i < Math.min(10, strings.length); i++) {
                  const differentMessages = splitter(strings[i], 4000);
                  for (var j = 0; j < differentMessages.length; j++) {
                    await this.sendMessage(env.API_KEY, chatId, differentMessages[j]);
                  }
                }
              }

            } catch (error) {
              console.error(error);
              await this.sendMessage(env.API_KEY, chatId, `Ошибка: ${error}`);
            }
          }
      }
      
      return new Response('OK');
  },

  async sendMessage(apiKey, chatId, text){
    const url = `https://api.telegram.org/bot${apiKey}/sendMessage?chat_id=${chatId}&text=${text}`;
    const data = await fetch(url).then(resp => resp.json());
    if (!data.ok) {
      const newText = `Не удалось отправить запрос: ${JSON.stringify(data, null, 2)}`;
      console.log("ERROR: ", newText, data);
      const newUrl = `https://api.telegram.org/bot${apiKey}/sendMessage?chat_id=${chatId}&text=${newText}`;
      await fetch(newUrl).then(resp => resp.json());
    }
}
};
