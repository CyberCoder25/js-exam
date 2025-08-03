//DOMContentLoaded ამოწმებს ჩატვირთულია თუ არა html სრულად.
document.addEventListener("DOMContentLoaded", () => {
  let CheckBox = document.querySelector('#MenuCheckBox')
  let header = document.querySelector("header")
  let nav = document.querySelector("nav")
  let menuPart = document.querySelector("#menuPart")
  let ul = document.querySelector("#menuUl")
  let contact = document.querySelector(".contact")
  let logo = document.querySelector(".logo")
  let form = document.getElementById("infoForm")
  let output = document.getElementById("output")
  let deleteBtn = document.getElementById("deleteBtn")


CheckBox.addEventListener("click", () => {
  if(CheckBox.checked){
    header.classList.add("toOpenBurger")
    nav.classList.add("burgerNav")
    contact.classList.add("burgerContact")
    logo.classList.add("logoOnBurger")
    menuPart.classList.add("menuOnBurger")
    ul.classList.add("ulOnBurger")
  }
  else {
    header.classList.remove("toOpenBurger")
    nav.classList.remove("burgerNav")
    contact.classList.remove("burgerContact")
    logo.classList.remove("logoOnBurger")
    menuPart.classList.remove("menuOnBurger")
    ul.classList.remove("ulOnBurger")
    ul.style.height = "100%"
  }
})
  
  loadInfo()

  form.addEventListener("submit", function (e) {//e ავტომატურად გადაეცემა ნებისმიერ ფუნქციას რომელიც გამოიყენება მოვლენებზე რეაგირებისთვის.
    e.preventDefault()//შეაჩერებს form-ის ავტომატურ გაგზავნას dom-ის ჩატვირთვისთანავე.

    // console.log(e)
    // console.log(e.target)

    //userInfo არის ობიექტი რომელიც ინახავს მომხმარებლის ინფორმაციას. ამ ობიექტის შექმნის შემდეგ შესაძლებელია მისი შენახვა, გამოტანა და ა.შ.
    let userInfo = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      phone: document.getElementById("phone").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
      aboutMe: document.getElementById("aboutMe").value,
    }

    // userInfo გადაიქცევა სტრიქონად (string) რომ შევძლოთ მისი შენახხვა localStorage-ში "userInfo"-ს key-თ? "userInfo" - არის key. userInfo არის ობიექტი.
    //რადგან localStorage-ში შესაძლებელია მხოლოდ სტრიქონული(string) ობიექტის შენახვა ამისთვის გვჭირდება stringify რომ userInfo ობიექტი გადაიქცეს სტრიქონად და შევინახოთ localStorage-ში.
    localStorage.setItem("userInfo", JSON.stringify(userInfo)) 
    showInfo(userInfo)//showInfo-ს ფუნქცია(ქვემოთ) გამოიტანს იმ ინფორმაციას რომელიც შეიყვანა მომხმარებელმა და შენახულია userInfo-ს ობიექტში.
  })

  deleteBtn.addEventListener("click", function () {
    localStorage.removeItem("userInfo")//მომხმარებლის მიერ შეყვანილი ინფორმაცია უკვე ჩაწერილია json ფორმატში და json უკვე გასტრინგებულია stringify()-თ. რადგან დამუშავებულია ობიექტი და მიწოდებულიც არის localStorage-ში ამიტომ აქვე შევქმენი წაშლის ფუნქციაც.
    output.innerHTML = "<em>Information deleted.</em>"
    // რადგან output არის ცვლადი რომლითაც p თეგის ტექსტი გამოდის გამოიტანს წაშლის ინფორმაციას.
    // // ან
    // output.textContent = "Information deleted."
  })

  function loadInfo() {
    let data = localStorage.getItem("userInfo")// data-ში შეინახება ინფორმაცია რომელიც უკვე შენახულია userInfo-ში.ასე შესაძლებელია ცვლადის მეშვეობით წამოიღო ინფო localStorage-დან.
    if(data){
      let userInfo =JSON.parse(data)// თუკი არსებობს ინფორმაცია მაშინ გადაიქცევა(parse) ისევ ტექსტის ფორმატად და გასაგებ ენაზე გამოიტანს ამ ინფორმაციას.
      showInfo(userInfo)
    }else{
      output.innerHTML = "<em>no information found</em>"
    }
  }

  // აღარ აღვწერ ისედაც გასაგებია ყველადერი :))
  //  seo-სთვის გამოვიყენე strong ტეგი.სემანტიკურადაც უფრო მისაღებია ვიდრე <b> .
  function showInfo(data){
    output.innerHTML =`
      <strong>My Name is:</strong> ${data.firstName}<br>
      <strong>My LastName is:</strong> ${data.lastName}<br>
      <strong>My Phone is:</strong> ${data.phone}<br>
      <strong>I am From:</strong> ${data.city}<br>
      <strong>My Email:</strong> ${data.email}<br>
      <strong>About me:</strong> ${data.aboutMe}
    `
  }
})


document.querySelectorAll('.toggleBtn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.question').classList.toggle('active')
  })
})

//washashleli ghilaki
function deleteQuestion(button) {
  button.closest('.activDiv').remove()
}