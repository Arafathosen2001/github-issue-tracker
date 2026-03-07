
const sectionAll = document.getElementById('main-content');
const sectionOpen = document.getElementById('section-open');
const sectionClosed = document.getElementById('section-close');

const totalContent = document.getElementById('total');
const openContent = document.getElementById('open');
const closeContent = document.getElementById('close');

const allBtn = document.getElementById('all-btn');
const openBtn = document.getElementById('open-btn');
const closeBtn = document.getElementById('close-btn');

const searchId = document.getElementById('search')


const switchTab = (tab) => {
    // console.log(tab);
    if (tab === 'all') {
        // console.log('tab-all');
        sectionAll.classList.remove('hidden')
        sectionOpen.classList.add('hidden')
        sectionClosed.classList.add('hidden')

        openContent.classList.add('hidden')
        totalContent.classList.remove('hidden')
        closeContent.classList.add('hidden')

        openBtn.classList.remove('btn-primary')
        allBtn.classList.add('btn-primary')
        closeBtn.classList.remove('btn-primary')
        
    }
    if (tab === 'open') {
        // console.log('tab-open');
        sectionOpen.classList.remove('hidden')
        sectionAll.classList.add('hidden')
        sectionClosed.classList.add('hidden')


        openContent.classList.remove('hidden')
        totalContent.classList.add('hidden')
        closeContent.classList.add('hidden')

        openBtn.classList.add('btn-primary')
        allBtn.classList.remove('btn-primary')
        closeBtn.classList.remove('btn-primary')
        
    }
    if (tab === 'close') {
        // console.log('tab-open');
        sectionOpen.classList.add('hidden')
        sectionAll.classList.add('hidden')
        sectionClosed.classList.remove('hidden')

        openContent.classList.add('hidden')
        totalContent.classList.add('hidden')
        closeContent.classList.remove('hidden')

        openBtn.classList.remove('btn-primary')
        allBtn.classList.remove('btn-primary')
        closeBtn.classList.add('btn-primary')
    }
}
const  loadAllIissues = async() => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const data = await res.json();
    //     .then((res) => res.json()).then((data) => {
        displyIssues(data.data);
        closeOpenIssue(data.data);

    // })
    // console.log(data.data);
};
loadAllIissues();

const creatLabels = (labels)=>{
    const labelHtml = labels.map(el => `<span class="bg-yellow-200 p-1 rounded-2xl">${el}</span>`);
    return(labelHtml.join(" "))
}
const allIssusContainer = document.getElementById('main-content');
const displyIssues = (data) => {
    // console.log(issu.labels);

    
    data.forEach(issu => {
        // const FindInterview = issu.status.find(job => job.open === "open");
        // console.log(FindInterview);
  
        
        const card = document.createElement('div');
        card.innerHTML = `
            <div id="card" class="cadr cursor-pointer h-full ${issu.status == "open" ? "border-t-3 border-green-500" : "border-t-3 border-purple-500"} p-3 bg-white rounded-md space-y-3 shadow-lg " onclick="loadSingelIssues(${issu.id})">
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
    const openCount = sectionOpen.children.length;
    const closeCount = sectionClosed.children.length;
    
    totalContent.innerText = totalCount;
    
    openContent.innerText = openCount;
    
    closeContent.innerText = closeCount;
    // console.log(closeCount);
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
                    <div class="badge ${issu.status =="open"?'badge-success':'bg-purple-500'} ">${issu.status}</div>
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

const closeOpenIssue = (data)=>{
    const openIssues = data.filter(issue => issue.status === "open");
    const closedIssues = data.filter(issue => issue.status === "closed");

    
    // console.log(openIssues);
    // console.log(closedIssues);
    openIssues.forEach(issu => {
        // console.log(issu)


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
        sectionOpen.append(card);
        countIssues();
    })
    closedIssues.forEach(issu => {
        // console.log(issu)


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
        sectionClosed.append(card);
        countIssues();
    })
}


const searchLoad = async () => {
    const v = searchId.value;
    const svalue = document.getElementById('velue-display');
    svalue.innerText =v;
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${v}`;
    // console.log(url);
    const res =await fetch(url);
    const data =await res.json();
    displySarchIssues(data.data);
    
    searchId.value = "";

    const modat = document.getElementById('search_modal').showModal();
}
const displySarchIssues = (data) => {
    data.forEach(issu => {
        // const FindInterview = issu.status.find(job => job.open === "open");
        // console.log(FindInterview);
        const serchContainer = document.getElementById('seatch-value');
  
        
        const card = document.createElement('div');
        card.innerHTML = `

            <div id="card" class="cadr cursor-pointer h-full ${issu.status == "open" ? "border-t-3 border-green-500" : "border-t-3 border-purple-500"} p-3 bg-white rounded-md space-y-3 shadow-lg " onclick="loadSingelIssues(${issu.id})">
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
        

        serchContainer.append(card);
    });
}


