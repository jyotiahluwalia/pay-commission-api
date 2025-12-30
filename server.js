const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware - CORS configuration AFTER app is created
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://jyotiahluwalia.com',
        'http://jyotiahluwalia.com',
        'https://www.jyotiahluwalia.com',
        'http://www.jyotiahluwalia.com'
    ],
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json());

// ============================================
// SECRET DATA - KEEP THIS ON SERVER ONLY
// ============================================

const payMatrix = {
    1: [18000, 18500, 19100, 19700, 20300, 20900, 21500, 22100, 22800, 23500, 24200, 24900, 25600, 26400, 27200, 28000, 28800, 29700, 30600, 31500, 32400, 33400, 34400, 35400, 36500, 37600, 38700, 39900, 41100, 42300, 43600, 44900, 46200, 47600, 49000, 50500, 52000, 53600, 55200, 56900],
    2: [19900, 20500, 21100, 21700, 22400, 23100, 23800, 24500, 25200, 26000, 26800, 27600, 28400, 29300, 30200, 31100, 32000, 33000, 34000, 35000, 36100, 37200, 38300, 39400, 40600, 41800, 43100, 44400, 45700, 47100, 48500, 50000, 51500, 53000, 54600, 56200, 57900, 59600, 61400, 63200],
    3: [21700, 22400, 23100, 23800, 24500, 25200, 26000, 26800, 27600, 28400, 29300, 30200, 31100, 32000, 33000, 34000, 35000, 36100, 37200, 38300, 39400, 40600, 41800, 43100, 44400, 45700, 47100, 48500, 50000, 51500, 53000, 54600, 56200, 57900, 59600, 61400, 63200, 65100, 67100, 69100],
    4: [25500, 26300, 27100, 27900, 28700, 29600, 30500, 31400, 32300, 33300, 34300, 35300, 36400, 37500, 38600, 39800, 41000, 42200, 43500, 44800, 46100, 47500, 48900, 50400, 51900, 53500, 55100, 56800, 58500, 60300, 62100, 64000, 65900, 67900, 69900, 72000, 74200, 76400, 78700, 81100],
    5: [29200, 30100, 31000, 31900, 32900, 33900, 34900, 35900, 37000, 38100, 39200, 40400, 41600, 42800, 44100, 45400, 46800, 48200, 49600, 51100, 52600, 54200, 55800, 57500, 59200, 61000, 62800, 64700, 66600, 68600, 70700, 72800, 75000, 77300, 79600, 82000, 84500, 87000, 89600, 92300],
    6: [35400, 36500, 37600, 38700, 39900, 41100, 42300, 43600, 44900, 46200, 47600, 49000, 50500, 52000, 53600, 55200, 56900, 58600, 60400, 62200, 64100, 66000, 68000, 70000, 72100, 74300, 76500, 78800, 81200, 83600, 86100, 88700, 91400, 94100, 96900, 99800, 102800, 105900, 109100, 112400],
    7: [44900, 46200, 47600, 49000, 50500, 52000, 53600, 55200, 56900, 58600, 60400, 62200, 64100, 66000, 68000, 70000, 72100, 74300, 76500, 78800, 81200, 83600, 86100, 88700, 91400, 94100, 96900, 99800, 102800, 105900, 109100, 112400, 115800, 119300, 122900, 126600, 130400, 134300, 138300, 142400],
    8: [47600, 49000, 50500, 52000, 53600, 55200, 56900, 58600, 60400, 62200, 64100, 66000, 68000, 70000, 72100, 74300, 76500, 78800, 81200, 83600, 86100, 88700, 91400, 94100, 96900, 99800, 102800, 105900, 109100, 112400, 115800, 119300, 122900, 126600, 130400, 134300, 138300, 142400, 146700, 151100],
    9: [53100, 54700, 56300, 58000, 59700, 61500, 63300, 65200, 67200, 69200, 71300, 73400, 75600, 77900, 80200, 82600, 85100, 87700, 90300, 93000, 95800, 98700, 101700, 104800, 107900, 111100, 114400, 117800, 121300, 124900, 128600, 132500, 136500, 140600, 144800, 149100, 153600, 158200, 162900, 167800],
    10: [56100, 57800, 59500, 61300, 63100, 65000, 67000, 69000, 71100, 73200, 75400, 77700, 80000, 82400, 84900, 87400, 90000, 92700, 95500, 98400, 101400, 104400, 107500, 110700, 114000, 117400, 120900, 124500, 128200, 132000, 136000, 140100, 144300, 148600, 153100, 157700, 162400, 167300, 172300, 177500],
    11: [67700, 69700, 71800, 74000, 76200, 78500, 80900, 83300, 85800, 88400, 91100, 93800, 96600, 99500, 102500, 105600, 108800, 112100, 115500, 119000, 122600, 126300, 130100, 134000, 138000, 142100, 146400, 150800, 155300, 159900, 164800, 169700, 174800, 180000, 185400, 191000, 196700, 202600, 208700],
    12: [78800, 81200, 83600, 86100, 88700, 91400, 94100, 96900, 99800, 102800, 105900, 109100, 112400, 115800, 119300, 122900, 126600, 130400, 134300, 138300, 142400, 146700, 151100, 155600, 160300, 165100, 170100, 175200, 180500, 185900, 191500, 197200, 203100, 209200],
    13: [123100, 126800, 130600, 134500, 138500, 142700, 147000, 151400, 155900, 160600, 165400, 170400, 175500, 180800, 186200, 191800, 197600, 203500, 209600, 215900],
    '13A': [131100, 135000, 139100, 143300, 147600, 152000, 156600, 161300, 166100, 171100, 176200, 181500, 186900, 192500, 198300, 204200, 210300, 216600],
    14: [144200, 148500, 153000, 157600, 162300, 167200, 172200, 177400, 182700, 188200, 193800, 199600, 205600, 211800, 218200],
    15: [182200, 187700, 193300, 199100, 205100, 211300, 217600, 224100],
    16: [205400, 211600, 217900, 224400],
    17: [225000],
    18: [250000]
};

const levelMetadata = {
    1: { level: '1', gradePay: '1800', band: '5200-20200', name: 'Level 1 (GP 1800)' },
    2: { level: '2', gradePay: '1900', band: '5200-20200', name: 'Level 2 (GP 1900)' },
    3: { level: '3', gradePay: '2000', band: '5200-20200', name: 'Level 3 (GP 2000)' },
    4: { level: '4', gradePay: '2400', band: '5200-20200', name: 'Level 4 (GP 2400)' },
    5: { level: '5', gradePay: '2800', band: '5200-20200', name: 'Level 5 (GP 2800)' },
    6: { level: '6', gradePay: '4200', band: '9300-34800', name: 'Level 6 (GP 4200)' },
    7: { level: '7', gradePay: '4600', band: '9300-34800', name: 'Level 7 (GP 4600)' },
    8: { level: '8', gradePay: '4800', band: '9300-34800', name: 'Level 8 (GP 4800)' },
    9: { level: '9', gradePay: '5400', band: '9300-34800', name: 'Level 9 (GP 5400 PB-2)' },
    10: { level: '10', gradePay: '5400', band: '15600-39100', name: 'Level 10 (GP 5400 PB-3)' },
    11: { level: '11', gradePay: '6600', band: '15600-39100', name: 'Level 11 (GP 6600)' },
    12: { level: '12', gradePay: '7600', band: '15600-39100', name: 'Level 12 (GP 7600)' },
    13: { level: '13', gradePay: '8700', band: '37400-67000', name: 'Level 13 (GP 8700)' },
    '13A': { level: '13A', gradePay: '8900', band: '37400-67000', name: 'Level 13A (GP 8900)' },
    14: { level: '14', gradePay: '10000', band: '37400-67000', name: 'Level 14 (GP 10000)' },
    15: { level: '15', gradePay: 'N/A', band: '67000-79000', name: 'Level 15 (HAG)' },
    16: { level: '16', gradePay: 'N/A', band: '75500-80000', name: 'Level 16 (HAG+)' },
    17: { level: '17', gradePay: 'N/A', band: '80000 (Fixed)', name: 'Level 17 (Apex)' },
    18: { level: '18', gradePay: 'N/A', band: '90000 (Fixed)', name: 'Level 18 (Cabinet Secretary)' }
};

const transportAllowance = {
    level_1_2: { high: 1350, other: 900 },
    level_3_8: { high: 3600, other: 1800 },
    level_9_plus: { high: 7200, other: 3600 }
};

const payBands = ['5200-20200', '9300-34800', '15600-39100', '37400-67000', '67000-79000', '75500-80000', '80000 (Fixed)', '90000 (Fixed)'];

// ============================================
// HELPER FUNCTIONS
// ============================================

function sortLevels(a, b) {
    const numA = parseFloat(String(a).replace('A', '.5'));
    const numB = parseFloat(String(b).replace('A', '.5'));
    return numA - numB;
}

function getTaCategory(level) {
    const num = parseFloat(String(level).replace('A', '.5'));
    if (num >= 1 && num <= 2) return 'level_1_2';
    if (num >= 3 && num <= 8) return 'level_3_8';
    if (num >= 9) return 'level_9_plus';
    return null;
}

function formatCurrency(num) {
    if (typeof num !== 'number' || isNaN(num)) return '0';
    return Math.round(num).toLocaleString('en-IN');
}

// ============================================
// API ENDPOINTS
// ============================================

// 1. Get Metadata (Pay Bands)
app.get('/api/metadata', (req, res) => {
    res.json({
        payBands: payBands
    });
});

// 2. Get Grade Pays for a Pay Band
app.get('/api/grade-pays', (req, res) => {
    const { payBand } = req.query;
    
    if (!payBand) {
        return res.status(400).json({ error: 'Pay band is required' });
    }

    const relevantLevels = Object.values(levelMetadata).filter(m => m.band === payBand);
    const gradePays = [...new Set(relevantLevels.map(m => m.gradePay))].sort((a, b) => {
        if (a === 'N/A') return 1;
        if (b === 'N/A') return -1;
        return parseInt(a) - parseInt(b);
    });

    const gradePayOptions = gradePays.map(gp => ({
        value: gp,
        label: gp === 'N/A' ? 'HAG / Apex (N/A)' : gp
    }));

    res.json(gradePayOptions);
});

// 3. Get Levels for Pay Band and Grade Pay
app.get('/api/levels', (req, res) => {
    const { payBand, gradePay } = req.query;
    
    if (!payBand || !gradePay) {
        return res.status(400).json({ error: 'Pay band and grade pay are required' });
    }

    const relevantLevels = Object.values(levelMetadata).filter(m => 
        m.band === payBand && m.gradePay === gradePay
    );
    
    const levels = relevantLevels.map(m => m.level).sort(sortLevels);
    const levelOptions = levels.map(level => ({
        value: level,
        label: levelMetadata[level].name
    }));

    res.json(levelOptions);
});

// 4. Get Indices for a Level
app.get('/api/indices', (req, res) => {
    const { level } = req.query;
    
    if (!level) {
        return res.status(400).json({ error: 'Level is required' });
    }

    if (!payMatrix[level]) {
        return res.status(404).json({ error: 'Level not found' });
    }

    const salaries = payMatrix[level];
    const indexOptions = salaries.map((salary, idx) => ({
        value: idx + 1,
        label: `Index ${idx + 1} (₹${formatCurrency(salary)})`
    }));

    res.json(indexOptions);
});

// 5. Calculate Salary (THE MAIN SECRET LOGIC)
app.post('/api/calculate', (req, res) => {
    const { level, index, fitmentFactor, hraRate, taType, daPercent } = req.body;

    // Validation
    if (!level || !index || fitmentFactor === undefined || hraRate === undefined || taType === undefined || daPercent === undefined) {
        return res.status(400).json({ 
            success: false,
            message: 'All fields are required' 
        });
    }

    if (!payMatrix[level]) {
        return res.status(400).json({ 
            success: false,
            message: 'Invalid level' 
        });
    }

    if (index < 1 || index > payMatrix[level].length) {
        return res.status(400).json({ 
            success: false,
            message: 'Invalid index' 
        });
    }

    // SECRET CALCULATIONS
    const current7thBasic = payMatrix[level][index - 1];
    const estimated8thBasic = Math.round(current7thBasic * fitmentFactor);
    const hraAmount = Math.round(estimated8thBasic * hraRate);

    // TA calculation
    const taCategory = getTaCategory(level);
    let baseTa = 0;
    if (taType !== '0' && taCategory && transportAllowance[taCategory]) {
        baseTa = transportAllowance[taCategory][taType] || 0;
    }
    const daOnTa = Math.round(baseTa * (daPercent / 100));
    const totalTa = baseTa + daOnTa;

    const daOnBasic = Math.round(estimated8thBasic * (daPercent / 100));
    const grossSalary = estimated8thBasic + hraAmount + totalTa + daOnBasic;

    // Return results
    res.json({
        success: true,
        current7thBasic,
        estimated8thBasic,
        hraAmount,
        totalTa,
        daOnBasic,
        grossSalary,
        levelName: levelMetadata[level].name,
        indexDisplay: index
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Pay Commission API is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Pay Commission API Server running on port ${PORT}`);
});
