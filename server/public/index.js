function handleLoginTab(){
    console.log('handleLoginTab()')
    document.getElementById('form-signup').style.display = 'none';
    document.getElementById('form-login').style.display = 'block';
}

function handleSighupTab(){
    console.log('handleSighupTab()')
    document.getElementById('form-signup').style.display = 'block';
    // document.getElementById('form-signup').style.backgroundColor= 'rgba(245, 245, 245, 0.582)';
    document.getElementById('form-login').style.display = 'none';



}

function handlelogin(event) {
    event.preventDefault()
    let userID=''

    let username = event.target.username.value;
    let password = event.target.password.value;
    let auth = { username, password }
  

    fetch('users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(auth)
    }).then(res => res.json())
        .then(data => { 
            console.log(data)
            if(data.ok){
             userID = data.user._id
             console.log(data)
             console.log(userID)
             window.location.href = "/main.html";
               
               
            }
            else{
                console.log(data.ok)
                document.body.style.backgroundColor = 'red'
                document.getElementById('root').innerHTML =  ` The username or password are inncorrect. please enter try agian `
            }

           
            

        })
}

function handlesignup(event) {
    event.preventDefault()

    let username = event.target.username.value;
    let password = event.target.password.value;
    let auth = { username, password }



    fetch('users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(auth)
    }).then(res => res.json())
        .then(data => {
            console.log(data)
            console.log(`welcome ${data.newUser.username}`)
            

        })
}
