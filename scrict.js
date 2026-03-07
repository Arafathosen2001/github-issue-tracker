const switchTab = (tab) => {
    // console.log(tab);
}
const loadAllIissues = () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url).then((res) => res.json()).then((data) => displyIssues(data.data))
};
loadAllIissues();

const creatLabels = (labels)=>{
    const labelHtml = labels.map(el => `<span class="bg-yellow-200 p-1 rounded-2xl">${el}</span>`);
    return(labelHtml.join(" "))
}
const allIssusContainer = document.getElementById('main-content');
const displyIssues = (data) => {
    // console.log(issu.labels);
 
    
    // console.log(data);
    data.forEach(issu => {
        
        const card = document.createElement('div');
        card.innerHTML = `
            <div id="card" class="cadr cursor-pointer h-full ${issu.status == "open" ? "border-t-3 border-green-500" : "border-t-3 border-purple-500"} p-3 bg-white rounded-md space-y-3 " onclick="loadSingelIssues(${issu.id})">
            <div class="flex justify-between items-center">
                <div>
                    ${issu.status == "open" ? `<img class="w-6 h-6" src="./assets/Open-Status.png" alt="">` : `<img class="w-6 h-6" src="./assets/Closed- Status .png" alt="">`}
                </div>
                <button class="btn btn-soft btn-secondary rounded-3xl">${issu.priority}</button>
            </div>
            <div class="con">
                <h3 class="font-semibold line-clamp-1">${issu.title}</h3>
                <p class="text-gray-500 line-clamp-2">${issu.description}</p>
            </div>
            <div class="badg flex gap-2">
            
                <div class="">${creatLabels(issu.labels)}</div>
            </div>
            <hr class="text-gray-500 border border-gray-500">
            <div class="date flex justify-between">
                <div>
                    <p class="text-gray-500">#${issu.author}</p>
                    <p class="text-gray-500">${issu.assignee}</p>
                </div>
                <div>
                    <p class="text-gray-500 text-right">${issu.createdAt}</p>
                    <p class="text-gray-500">${issu.updatedAt}</p>
                </div>
            </div>

        </div>
        `
        

        allIssusContainer.append(card);
        countIssues();
    });
};
const countIssues = () => {
    const totalCount = allIssusContainer.children.length;
    // console.log(totalCount);
    const totalContent = document.getElementById('total');
    totalContent.innerText = totalCount;
}

const loadSingelIssues = (id) => {
    // console.log(id);
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    fetch(url).then((res) => res.json()).then((modal) => displySingelIssues(modal.data))
};
const displySingelIssues = (issu) => {
    // console.log(issu)
    const modalBox = document.getElementById('modal-box');
    modalBox.innerHTML = "";
    
    const modalDiv = document.createElement('div');
    modalDiv.classList.add('space-y-4')
    modalDiv.innerHTML = `
                <h3 class="font-semibold line-clamp-1">${issu.title}</h3>
                <div class="">
                    <div class="badge badge-success">${issu.status}</div>
                    <div class="badge "><div aria-label="status" class="status status-sm"></div>Opened by <p class="text-gray-500">${issu.author}</p></div>
                    <div class="badge "><div aria-label="status" class="status status-sm"></div><p class="text-gray-500 text-right">${issu.createdAt}</p></div>
                </div>
                    <div class="badg flex gap-2">
                        <div class="">${creatLabels(issu.labels)}</div>
                    </div>
                    
                    <div class="con">
                        
                        <p class="text-gray-500 line-clamp-2">${issu.description}</p>
                    </div>
                    
                    <div class="date flex justify-between bg-gray-300 p-10">
                        <div>
                            
                            <p class="">Assignee:</p>
                            <p class="text-gray-500">${issu.assignee}</p>
                        </div>
                        <div>
                            <p class="">Priority:</p>
                            <div class="badge badge-secondary">${issu.priority}</div>
                        </div>
                    </div>
                    `
                    modalBox.append(modalDiv);
                    const modalId = document.getElementById('issues_modal').showModal();
}


