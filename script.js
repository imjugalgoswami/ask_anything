
const GEMINI_API_KEY = "AIzaSyBXd30FFFeIZDfXSlN3fKxItqVIuDxXx0c";

let answer = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

let input = document.querySelector(".search-section input");
let answerBox = document.querySelector(".answer-section");
let loader = document.querySelector(".loader");

input.addEventListener("keypress",async (e)=>{
    if (e.key === 'Enter') {
        answerBox.innerHTML = "";
        loader.classList.remove("disable");
        let prompt = input.value;
        input.value = "";
        let response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: '{\n  "contents": [{\n    "parts":[{"text": "Explain how AI works"}]\n    }]\n   }',
            body: JSON.stringify({
                'contents': [
                    {
                        'parts': [
                            {
                                'text': `${prompt}`
                            }
                        ]
                    }
                ]
            })
        });
        const json = await response.json();
        loader.classList.add("disable");
        answer = json.candidates[0].content.parts[0].text;
        answerBox.innerHTML = MarkdownToHtml.parse(answer);
        console.log(answer);
    }
 
    
});