//sending the info to the bot
let data = [];
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
    const user = {
        name: userName.value,
        gmail: userGmail.value,
        time: formattedDate,
        id: Date.now(),
    }
    data.push(user)
    console.log(data)
    $('#userName').val('');
    $('#userGmail').val('');
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
            'color': 'rgb(128, 71, 243)',
            'background-color': '#fff',
            'font-size': '80px',
            'transition': '1s ease',
            'letter-spacing': '4px',
        });
    },
    () => {
        $('.textContainer_text').css({
            'color': '#fff',
            'background-color': 'rgb(128, 71, 243)',
            'font-size': '64px',
            'transition': '1s ease',
            'letter-spacing': 'normal',
        });
    }
);
