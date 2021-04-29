"use-strict";
///////////////////////////////////////////////////////////////////////////
///////////////////////////////// ACCOUNTS ////////////////////////////////
///////////////////////////////////////////////////////////////////////////

class Account {
    constructor (username, password, ethAccount) {
        this.username = username;
        this.password = password;
        this.ethAccount = ethAccount;
    }
}

const account1 = new Account("sovereign9999777", "1234", {address: "0x6c6541cc3ec6bfc2d7b0ca48ccb0225cbbea9b59", ethBalance: 32.00, erc20Balance: {jrt: 12431, buidl: 25333, arte: 741, xtk: 18589}});
const account2 = new Account("JULIEN", "complicatedPassword", {address: "0x0be0ecc301a1c0175f07a66243cff628c24db852", ethBalance: 1241.3, erc20Balance: {sdt: 1247864, curve: 25314533, aave: 741, wbtc: 5.65}});
const account3 = new Account("Ethos", "buidler123", {address: "0x0cac9c3d7196f5bbd76fadcd771fb69b772c0f9d", ethBalance: 3.8, erc20Balance: {jrt: 12431, buidl: 25333, arte: 741, xtk: 18589}});
const account4 = new Account("RandomTikToker", "trolol", {address: "0xE738A495717823DC552830e7547742Fc5aCe3D49", ethBalance: 0.1, erc20Balance: {doge: 124315741, akita: 255168333}});
let accounts = [account1, account2, account3, account4];

///////////////////////////////////////////////////////////////////////////
/////////////////////////////// STRATEGIES ////////////////////////////////
///////////////////////////////////////////////////////////////////////////

class Strategies {
    constructor (name, apy, token) {
        this.name = name;
        this.apy = apy;
        this.token = token;
    }
}

const passiveUSDstrat = new Strategies("USDStrat", 43.21, "USD");
const passiveEURstrat = new Strategies("EURStrat", 31.85, "EUR");
const passiveBTCstrat = new Strategies("BTCStrat", 5.63, "BTC");
const strategies = [passiveUSDstrat, passiveEURstrat, passiveBTCstrat];

strategies.forEach((strategy) => {
    const elementToChange = document.querySelectorAll(`[data-apy-${strategy.name}]`);
    elementToChange.forEach((element) => element.innerHTML = `${strategy.apy} <span class="blue-grey" >%</span>`);
})

////////////
// Popups
const popups = document.querySelectorAll(".modal-strat");
const strategiesElement = document.querySelectorAll(".strategy");

const modal = document.querySelector('.modal');
const btnCloseModal = document.querySelectorAll('.btn--close-modal');
const overlay = document.querySelector('.overlay');
let activePopup;

const openPopup = () => {
    activePopup.classList.remove("hidden");
    activePopup.classList.add("active-modal");
    overlay.classList.remove('hidden');  
}
strategiesElement.forEach((strategy) => {
    strategy.addEventListener("click", () => {
        activePopup = document.querySelector(`.modal-${strategy.classList[3]}`);
        openPopup();
    })
})

const closeModal = function () {
    activePopup.classList.add("hidden");
    activePopup.classList.remove("active-modal");
    overlay.classList.add('hidden');
}

overlay.addEventListener("click", closeModal);

btnCloseModal.forEach((button) => button.addEventListener('click', closeModal));

///////////////////////////////////////////////////////////////////////////
/////////////////////////// GENERALS FUNCTIONS ////////////////////////////
///////////////////////////////////////////////////////////////////////////

const accountExamples = document.querySelector(".account-examples");
const accountExamplesPopup = document.querySelector(".modal-account-example");
const closeModalAccountExample = document.querySelector(".btn--close-modal-accounts");

accountExamples.addEventListener("click", () => {
    accountExamplesPopup.classList.remove("hidden");
});

closeModalAccountExample.addEventListener("click", () => {
    accountExamplesPopup.classList.add("hidden");
})

const navigationElement = document.querySelectorAll(".categories");
const pagesContent = document.querySelectorAll(".page-content");

const changePage = () => {
    navigationElement.forEach((category) => {
        category.addEventListener("click", e => {
            navigationElement.forEach((cat) => cat.classList.remove("current"));
            category.classList.add("current");
            pagesContent.forEach((page) => page.classList.add("hidden"));
            const pageToChange = `${category.textContent.toLowerCase().split(" ").join("-")}-page`;
            document.querySelector(`.${pageToChange}`).classList.remove("hidden");
        })
    })
}
changePage();

///////////////////////////////////////////////////////////////////////////
///////////////////////// LOGIN PAGE FUNCTIONS ////////////////////////////
///////////////////////////////////////////////////////////////////////////


const loginUsername = document.querySelector("[data-username]");
const loginPassword = document.querySelector("[data-password]");
const loginButton = document.querySelector(".login-button");
const wrongLoginMessage = document.querySelector(".wrong-login");
const loginPage = document.querySelector(".login-page");
const dashboardPage = document.querySelector(".dashboard-page");
const accountDisplayElement = document.querySelector(".account-display");
const addressDisplayElement = document.querySelector(".address");
const balanceDisplayElement = document.querySelector(".balance");

let currentAccount;
// currentAccount = account1;

const loadDashboardPage = () => {
    loginPage.classList.add("hidden");
    accountDisplayElement.classList.remove("hidden");
    dashboardPage.classList.remove("hidden");
}

const displayEthAddress = (currentAccount) => {
    const ethAddress = currentAccount.ethAccount.address;
    addressDisplayElement.textContent = `${ethAddress.slice(0, 5)}...${ethAddress.slice(-3)}`;
}

const displayEthBalance = (currentAccount) => {
    balanceDisplayElement.textContent = `${currentAccount.ethAccount.ethBalance} Ξ`;
}

const login = function () {
    let foundAnAccount;
    accounts.forEach((account) => {
        if (account.username === loginUsername.value && account.password === loginPassword.value) {
            loadDashboardPage();
            currentAccount = account;
            displayEthAddress(currentAccount);
            displayEthBalance(currentAccount);
            foundAnAccount = true;
        }
    })
    if(!foundAnAccount) wrongLoginMessage.classList.remove("hidden");
}

loginButton.addEventListener("click", e => {
    if(!currentAccount) {
        login();
        displayBalance();
    } else {
        loadDashboardPage();
        displayEthBalance(currentAccount);
        displayEthAddress(currentAccount);
        displayBalance();
    }
})

///////////////////////////////////////////////////////////////////////////
////////////////////////// DASHBOARD FUNCTIONS ////////////////////////////
///////////////////////////////////////////////////////////////////////////

const displayAssets = document.querySelector(".asset-array");

const displayBalance = () => {
    const erc20BalanceMap = new Map(Object.entries(currentAccount.ethAccount.erc20Balance));
    const erc20BalanceArray = [...erc20BalanceMap];
    
    erc20BalanceArray.forEach((asset) => {
        displayAssets.insertAdjacentHTML("afterbegin", 
        `<div class="line-dashboard-display-asset">
            <div class="asset">
                <img class="logo-asset" src="images/logo/${asset[0]}.png"/>
                <div class="asset-name">${asset[0].toUpperCase()}</div>
            </div>
            <div class="asset-amount">${asset[1]}</div>
        </div>`)
    })
}
