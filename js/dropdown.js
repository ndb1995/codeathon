var acc = document.getElementsByClassName("question");

for (var i = 0; i < acc.length; i++)
{
    acc[i].style.cursor = "pointer";

    acc[i].onclick = function ()
    {
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("show");
    }
}