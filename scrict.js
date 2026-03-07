const switchTab = (tab) => {
    // console.log(tab);
}
const loadAllIissues = () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url).then((res) => res.json()).then((data) => displyIssues(data.data))
};

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
            <div id="card" class="cadr cursor-pointer h-full ${issu.status == "open" ? "border-t-3 border-green-500" : "border-t-3 border-purple-500"} p-3 bg-white rounded-md space-y-3 " ">
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

loadAllIissues();