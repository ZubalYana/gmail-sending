//sending the info to the bot
sendBtn.onclick = function(){
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1; 
    let year = currentDate.getFullYear();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();
    let formattedDate = day + '/' + month + '/' + year + ' у ' + hours + ':' + minutes + ':' + seconds;
    console.log(formattedDate);
    const data = {
        name: userName.value,
        gmail: userGmail.value,
        time: formattedDate,
        id: Date.now(),
    }
    console.log(data)
    axios.post('http://localhost:3000/send', data)
    .then((res)=>{
        console.log(res.data)
        if(res.status == 200){
            userName.value = '';
            userGmail.value = '';
        }
    })
}

//the text animation
$('.textContainer_text').hover(
    () => {
        $('.textContainer_text').css({
            'color': 'rgb(243, 71, 71)',
            'background-color': '#fff',
            'font-size': '80px',
            'transition': '1s ease',
            'letter-spacing': '4px',
        });
    },
    () => {
        $('.textContainer_text').css({
            'color': '#fff',
            'background-color': 'rgb(243, 71, 71)',
            'font-size': '64px',
            'transition': '1s ease',
            'letter-spacing': 'normal',
        });
    }
);
