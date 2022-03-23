var opalta = document.getElementById("alta")
var opmedia = document.getElementById("media")
var opbaixa = document.getElementById("baixa")
var submit = document.getElementById("submit")
var tableTasks = document.getElementById('tableTasks')
var priority = 'alta';
var banco = []

var not;    

// evitando a seleção de duas prioridades ao mesmo tempo e atrubuindo valor para a variável priority
opalta.addEventListener('click', () => {
    opalta.checked = true
    opmedia.checked = false
    opbaixa.checked = false
    priority = opalta.value

})
opmedia.addEventListener('click', () => {
    opalta.checked = false
    opmedia.checked = true
    opbaixa.checked = false
    priority = opmedia.value
})
opbaixa.addEventListener('click', () => {
    opmedia.checked = false
    opalta.checked = false
    opbaixa.checked = true
    priority = opbaixa.value
})

 function AdcBanco(titulo, descricao, priority, done){
     banco.push({titulo, descricao, priority, done})
 }
 function AtualizarTela(){
    while(tableTasks.firstChild){
        tableTasks.removeChild(tableTasks.firstChild)
    }
     banco.forEach((item, index)=>{
        var task = document.createElement('label')
         task.classList.add('task')
         task.classList.add(item.priority)
            if(item.done == 'checked'){
                task.classList.add('done')
            }
         task.innerHTML = `
         <input type="checkbox" data-indice=${index} ${item.done}>
         <h3>${item.titulo}</h3>
         <p>${item.descricao}</p>
         <button class="eraser" data-indice=${index} >Apagar</button>
         `
         tableTasks.appendChild(task)
        })

        if(tableTasks.firstChild == null){
            tableTasks.classList.add('hidden')
        }else{
            tableTasks.classList.remove('hidden')
        }
 }

 submit.addEventListener('click', ()=> {
    var titulo = document.getElementById('title')
    var descricao = document.getElementById('description')
    var done = '';

 banco.forEach(item=> {
    if(item.titulo == titulo.value){
        return not = true
    }
})
    if(not){
        alert('lembrete ja existente')
        not = false
    }else{
        AdcBanco(titulo.value, descricao.value, priority, done)
        AtualizarTela()
    }
})
function removerItem(index){
    banco.splice(index,1)
    AtualizarTela()
}
function markDone(index){
    banco[index].done = banco[index].done == '' ? 'checked':''
    AtualizarTela()
}
tableTasks.addEventListener('click', (e)=> {
    var checkbox = e.target
    const index = checkbox.dataset.indice
        if(checkbox.type === "submit"){
            removerItem(index)
        } else if(checkbox.type === "checkbox"){
            markDone(index)
        }
})

AtualizarTela()



