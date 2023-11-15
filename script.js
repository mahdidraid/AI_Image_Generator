// const api = "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";

// const input = document.getElementById('input');
// const image = document.querySelector('.image');

// const getimage = async ()=>
// {
//     const methos = {
//         method:"POST",  
//         headers:{
//             "Content-Type":"application/json", 
//             "Authorization":`Bearer ${api}`
//         },
//         body:JSON.stringify(
//             {
//                 "prompt":input.value, 
//                 "n":4,
//                 "size":"512x512"
//             }
//         ) 
//     };
//     const response = await fetch("https://api.openai.com/v1/images/generations",methos) 
 
//    if(response.ok)
//    {
//         const data = await response.json()
//         const listImage = data.data;
//         image.innerHTML = " "
//         listImage.map(photo =>{
//            const container = document.createElement("div")
//            image.append( container);
//            const img = document.createElement("img");
//            container.append(img)
//            img.src =photo.url
   
//       });

//    }else
//    {
//     console.error(`Error : ${response.status} - ${response.statusText}`);
//    }

// }

const api = "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";

const input = document.getElementById('input');
const image = document.querySelector('.image');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getimage = async () => {
    const method = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${api}`
        },
        body: JSON.stringify({
            "prompt": input.value,
            "n": 4,
            "size": "512x512"
        })
    };

    let retries = 3; // Set a maximum number of retries

    while (retries > 0) {
        try {
            const response = await fetch("https://api.openai.com/v1/images/generations", method);

            if (response.ok) {
                const data = await response.json();
                const listImage = data.data;
                image.innerHTML = " ";

                listImage.forEach(photo => {
                    const container = document.createElement("div");
                    image.appendChild(container);
                    const img = document.createElement("img");
                    container.appendChild(img);
                    img.src = photo.url;
                });

                // Exit the loop if the request is successful
                break;
            } else if (response.status === 429) {
                // If it's a rate limit error, wait and then retry
                await sleep(1000); // Wait for 1 second (adjust this value as needed)
                retries--;
            } else {
                console.error(`Error: ${response.status} - ${response.statusText}`);
                break;
            }
        } catch (error) {
            console.error("Error:", error);
            break;
        }
    }
};

// Example usage
// Replace this with the actual event triggering the function
document.getElementById('triggerButton').addEventListener('click', getimage);
