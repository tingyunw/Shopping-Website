myForm = document.getElementById("addform");
myForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    add_item();
});

async function add_item(){
        let myForm = document.getElementById("addform");
        let formData = new FormData(myForm);
        var pic_array = new Array();
        const fileInput = document.querySelector("#formFileMultiple");
        const files = fileInput.files;
        for (let i = 0; i < files.length; i++) {
            let buffer = await blob2buffer(files[i]);
            pic_array.push(Array.from(new Uint8Array(buffer)));
          }
        formData.set('pic', JSON.stringify(pic_array));
        
        // let a = Array.from(new Uint8Array(buffer));
        // let b = Object.fromEntries(formData);
        fetch('http://localhost:5000/db/add',{
            method: 'post',
            headers:{   
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
        })
        .then(() => {
            $("#addform")[0].reset();
        });
    
}

const fileUploader = document.querySelector("#formFileMultiple");
fileUploader.addEventListener('change',(e) => {
    display_img(e.target.files);
});

function readFile(file,i){
    return new Promise((resolve, reject) => {
      var reader = new FileReader();  
      reader.onload = function(e){
        let s = '#preview'+ String(i+1);
        document.querySelector(s).src = e.target.result;
        document.querySelector(s).width = '100';
        resolve('success')
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  
function display_img(curFiles){
    for(var i=0; i<curFiles.length; i++){
        const curFile = curFiles[i];
        readFile(curFile, i);
    }
    
}

function blob2buffer(blob){
    return new Promise((resolve, reject) => {
        var arrayBuffer;
        var fileReader = new FileReader();
        fileReader.onload = function(event){
            arrayBuffer = event.target.result;
            resolve(arrayBuffer);
        };
        fileReader.readAsArrayBuffer(blob);
        return arrayBuffer;
    });
}

// async function upload_img(pic){
//     url = 'http://localhost:5000/db/upload_img';
//     arrayBuffer = await blob2buffer(pic);

//     fetch(url, {
//         method: 'POST',
//         headers:{
//             'content-type':'application/json'
//         },
//         body: JSON.stringify({
//             it
//         })
//     })
// }