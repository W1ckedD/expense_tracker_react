const path = require('path');
const url = require('url');
const { app, BrowserWindow, ipcMain } = require('electron');
const connectDB = require('./config/db');
connectDB();


const userFunctions = require('./functions/user');
const transactionFunctions = require('./functions/transaction');

let mainWindow;

let isDev = false;

if (
    process.env.NODE_ENV !== undefined &&
    process.env.NODE_ENV === 'development'
) {
    isDev = true;
}

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1100,
        height: 800,
        show: false,
        icon: `${__dirname}/assets/icon.png`,
        webPreferences: {
            nodeIntegration: true,
            devTools: isDev ? true : false
        },
    });

    let indexPath;

    if (isDev && process.argv.indexOf('--noDevServer') === -1) {
        indexPath = url.format({
            protocol: 'http:',
            host: 'localhost:8080',
            pathname: 'index.html',
            slashes: true,
        });
    } else {
        indexPath = url.format({
            protocol: 'file:',
            pathname: path.join(__dirname, 'dist', 'index.html'),
            slashes: true,
        });
    }

    mainWindow.loadURL(indexPath);

    // Don't show until we are ready and loaded
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();

        // Open devtools if dev
        if (isDev) {
            const {
                default: installExtension,
                REACT_DEVELOPER_TOOLS,
            } = require('electron-devtools-installer');

            installExtension(REACT_DEVELOPER_TOOLS).catch(err =>
                console.log('Error loading React DevTools: ', err)
            );
        }
        
    });

    if(!isDev) {
        mainWindow.setMenu(null);
    } 
    mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createMainWindow);

// IPC Listeners
ipcMain.on('login', userFunctions.login);
ipcMain.on('register', userFunctions.register);
ipcMain.on('get-user', userFunctions.getUser);

ipcMain.on('get-user-transactions', transactionFunctions.getUserTransactions);
ipcMain.on(
    'get-user-transactions-by-date',
    transactionFunctions.getUserTransactionsByDate
);
ipcMain.on(
    'transaction-advanced-search',
    transactionFunctions.transactionAdvancedSearch
);
ipcMain.on('add-transaction', transactionFunctions.addTransaction);
ipcMain.on('delete-transaction', transactionFunctions.deleteTransaction);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createMainWindow();
    }
});

// Stop error
app.allowRendererProcessReuse = true;
