const api = "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";

const input = document.getElementById('input');
const image = document.getElementsByClassName('.image');

const getimage = async ()=>
{
    const methos = {
        method:"POST",
        Headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${api}`
        },
        body:JSON.stringify(
            {
                "prompt":input.value,
                "n":3,
                "size":"512x512"
            }
        )
    }
    const response = await fetch("https://api.openai.com/v1/images/generations",methos)
}