let siteIndex = 1;
let editingRow = null;

function adduser() {
    const siteNameInput = document.getElementById("site-name");
    const siteUrlInput = document.getElementById("site-url");

    const siteName = siteNameInput.value.trim();
    const siteUrl = siteUrlInput.value.trim();

    function setValidity(inputElement, isValid, message = "") {
        const feedbackElement = inputElement.nextElementSibling;

        if (!isValid) {
            inputElement.classList.add("is-invalid");
            inputElement.classList.remove("is-valid");
            feedbackElement.classList.remove("valid-feedback");
            feedbackElement.classList.add("invalid-feedback");
            feedbackElement.textContent = message;
        } else {
            inputElement.classList.add("is-valid");
            inputElement.classList.remove("is-invalid");
            feedbackElement.classList.remove("invalid-feedback");
            feedbackElement.classList.add("valid-feedback");
            feedbackElement.textContent = "";
        }
    }

    if (!siteName) {
        setValidity(siteNameInput, false, "Please enter a valid site name.");
        return;
    } else {
        setValidity(siteNameInput, true);
    }

    if (!siteUrl || !siteUrl.startsWith("http")) {
        setValidity(siteUrlInput, false, "Please enter a valid URL (e.g., http://example.com).");
        return;
    } else {
        setValidity(siteUrlInput, true);
    }

    const tableContent = document.getElementById("tableContent");

    if (editingRow) {
        editingRow.children[1].textContent = siteName;
        editingRow.children[2].textContent = siteUrl;
        editingRow = null;
    } else {
        const row = tableContent.insertRow();
        row.innerHTML = `
            <td>${siteIndex++}</td>
            <td>${siteName}</td>
            <td><a href="${siteUrl}" target="_blank" class="btn btn-link">Visit</a></td>
            <td><button class="btn btn-warning" onclick="editRow(this)">Update</button></td>
            <td><button class="btn btn-danger" onclick="deleteRow(this)">Delete</button></td>
            <td><button class="btn btn-secondary" onclick="searchRow('${siteName}', '${siteUrl}')">Search</button></td>
        `;
    }

    siteNameInput.value = "";
    siteUrlInput.value = "";
}

function editRow(button) {
    const row = button.parentElement.parentElement;
    editingRow = row;
    document.getElementById("site-name").value = row.children[1].textContent;
    document.getElementById("site-url").value = row.children[2].textContent;
}

function deleteRow(button) {
    const row = button.parentElement.parentElement;
    row.remove();
}

function searchRow(name, url) {
    alert(`Searching for:\nName: ${name}\nURL: ${url}`);
}
