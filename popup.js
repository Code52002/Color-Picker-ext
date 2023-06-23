const btn = document.querySelector('.changeColourBtn')
const colourGrid = document.querySelector('.colourGrid')
const colourValue = document.querySelector('.colourValue')


btn.addEventListener('click', async () => {

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    chrome.scripting.executeScript({

        target: { tabId: tab.id },
        function: pickColour,

    }, async(injectResults)=>{
        const[data]=injectResults
        if(data.result){
            const colour = data.result.sRGBHex
            colourGrid.style.backgroundColor = colour
            colourValue.innerText = colour

            try{
                await navigator.clipboard.writeText(colour)

            }catch(err){
                console.error(err)
            }
            
        }

        
        }
    );
    
    });




async function pickColour() {
   
try{

    //picker
    const eyeDropper =new EyeDropper()
    return await eyeDropper.open()
    // console.log(selectedColour)

}catch(err){
    console.error(err)
}

}