<script>
    import NavbarUser from "../../components/NavbarUser.svelte";
    import Footer from "../../components/Footer.svelte";
    import toast, { Toaster } from 'svelte-french-toast';
    import { Base_URL } from "../../stores/global";
   
    let formElement;
    let fullName= "";
    let email= "";
    let subject = "";
    let text = "";

    async function handleContact(){
        const data = { fullName, email, subject, text }

        try{
            const response = await fetch($Base_URL + '/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
              toast.success("Email was sent");
          }
       }
        catch(error) {
              toast.error(error);
        }
        formElement.reset();

    }
</script>
<NavbarUser />
<Toaster />

<h1 class="page-title">Kontakt</h1>
<hr />
<div class="grid-container">

  <div class="grid-item grid-item-1">
    <h1>Kontakt</h1>
    <h3>E-mail: biuro@waterfun-skorzecin.pl</h3>
    <h3>Tel: +48 601 522 321</h3>
    <img src="../../public/img/smmalpalm.webp" alt="" class="palm">
  </div>
  
  <div class="grid-item grid-item-2">
  <form bind:this={formElement} on:submit|preventDefault={handleContact}  class="contact-form">
  
    <label for="fullName" >Imię i Nazwisko</label>
    <input type="text" id="fullName" name="fullName"  required bind:value={fullName}>
      <label for="email" >Email</label>
      <input type="email" id="email" name="email"  required bind:value={email}>
    
      <label for="subject">Temat</label>
      <input type="text" id="subject" name="subject" required bind:value={subject}>
    
      <label for="message">Message</label>
      <textarea id="message" name="message" required bind:value={text} rows="5" cols="5"></textarea>
    
      <button type="submit">WYŚLIJ WIADOMOŚĆ</button>
    </form>
  </div>
  </div>

  <style>
    .contact-form {
    display: flex;
    flex-direction: column;

}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input,
textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
}

button {
  padding: 15px;
  font-size: 16px;
  letter-spacing: 0.6px;
  background-color: #007bff;

  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0069d9;
}


.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 20px 100px;
}
.grid-item {
  padding: 50px;
  min-height: 400px;
  border-radius: 20px;
  margin: 40px 80px;
  
}
.grid-item-2{
  background-color: rgb(252, 241, 225);
}
.grid-item-1{
  background-color: #7ec0f3;

}

.palm{
    width: 120px;
    height: 120px;
    mix-blend-mode: multiply;
}

.page-title {
  text-align: center; 
  margin: 3%; 
}


hr {
  border: none; 
  height: 2px; 
  background-color:#D3E5FF; 
  width: 100%; 
  margin-top: 0;
}


  </style>

  


  <Footer />
