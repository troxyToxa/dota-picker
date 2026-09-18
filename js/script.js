let tg = window.Telegram.WebApp;
tg.expand();

// Повні списки героїв за атрибутами
const heroesData = {
    str: [
        'Alchemist', 'Axe', 'Bristleback', 'Centaur_Warrunner', 'Chaos_Knight', 'Clockwerk',
        'Dawnbreaker', 'Doom', 'Dragon_Knight', 'Earth_Spirit', 'Earthshaker', 'Elder_Titan',
        'Huskar', 'Kunkka', 'Largo', 'Legion_Commander', 'Lifestealer','Lycan', 
        'Mars', 'Night_Stalker', 'Ogre_Magi', 'Omniknight', 'Phoenix', 'Primal_Beast', 
        'Pudge', 'Slardar', 'Spirit_Breaker', 'Sven', 'Tidehunter', 'Timbersaw',
        'Tiny', 'Treant_Protector', 'Tusk', 'Underlord', 'Undying', 'Wraith_King'
    ],
    agi: [
        'Anti-Mage',  'Bloodseeker', 'Bounty_Hunter', 'Broodmother', 'Clinkz',
        'Drow_Ranger', 'Ember_Spirit', 'Faceless_Void', 'Gyrocopter', 'Hoodwink', 'Juggernaut',
        'Kez', 'Lone_Druid', 'Luna', 'Medusa', 'Meepo', 'Mirana', 'Monkey_King',
        'Morphling', 'Naga_Siren', 'Phantom_Assassin', 'Phantom_Lancer', 'Razor', 'Riki',
        'Shadow_Fiend', 'Slark', 'Sniper', 'Spectre', 'Templar_Assassin', 'Terrorblade',
        'Troll_Warlord', 'Ursa', 'Vengeful_Spirit',  'Viper', 'Weaver'
    ],
    int: [
        'Ancient_Apparition', 'Chen', 'Crystal_Maiden', 'Dark_Seer', 'Dark_Willow', 'Disruptor', 'Enchantress', 'Grimstroke',
        'Invoker', 'Jakiro', 'Keeper_of_the_Light', 'Leshrac', 'Lich', 'Lina',
        'Lion', 'Muerta', 'Necrophos', 'Oracle', 'Outworld_Destroyer',
        'Puck', 'Pugna', 'Queen_of_Pain', 'Ringmaster', 'Rubick', 'Shadow_Demon', 'Shadow_Shaman', 'Silencer',
        'Skywrath_Mage', 'Storm_Spirit', 'Tinker', 'Warlock', 'Winter_Wyvern', 'Witch_Doctor', 'Zeus'
    ],
    uni: [
        'Abaddon', 'Arc_Warden', 'Bane', 'Batrider', 'Beastmaster', 'Brewmaster',
        'Dazzle', 'Death_Prophet', 'Enigma',
        'Io', 'Magnus', 'Marci', 'Natures_Prophet', 'Nyx_Assassin',
        'Pangolier', 'Sand_King', 'Snapfire', 'Techies',
        'Venomancer', 'Visage', 'Void_Spirit', 'Windranger', 
    ]
};

// Точна відповідність папок на твойому комп'ютері
const folderMapping = {
    str: 'Strenght',
    agi: 'Agility',
    int: 'Intelligence',
    uni: 'Universal'
};

let radiantTeam = [null, null, null, null, null];
let direTeam = [null, null, null, null, null];
let selectedHero = null;
let selectedFolder = null;
function showHeroes(type) {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('hero-list').style.display = 'block';
    
    let container = document.getElementById('heroes-container');
    container.innerHTML = ''; 
    
    let folderName = folderMapping[type];

    if (heroesData[type]) {
        heroesData[type].forEach(hero => {
            container.innerHTML += `<img src="${folderName}/${hero}.png" class="hero-icon" alt="${hero}" onclick="openModal('${hero}', '${folderName}')">`;
        });
    }
}

function back() {
    document.getElementById('main-menu').style.display = 'flex';
    document.getElementById('hero-list').style.display = 'none';
}

function openModal(heroName, folderName) {
    selectedHero = heroName;
    selectedFolder = folderName;
    let modalHtml = `
        <div id="team-modal" style="display:flex; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); justify-content:center; align-items:center; z-index:1000; backdrop-filter:blur(5px);">
            <div style="background:#222; padding:20px; border-radius:10px; border:1px solid rgba(255,255,255,0.2); text-align:center; display:flex; flex-direction:column; gap:12px; min-width:240px;">
                <h3 style="margin:0 0 10px 0; color:white;">Обрати: ${heroName}</h3>
                <button style="padding:12px; border:none; border-radius:6px; font-size:16px; cursor:pointer; font-weight:bold; background:#2ecc71; color:white;" onclick="assignHero('radiant')">Сяйво (Radiant)</button>
                <button style="padding:12px; border:none; border-radius:6px; font-size:16px; cursor:pointer; font-weight:bold; background:#e74c3c; color:white;" onclick="assignHero('dire')">Пітьма (Dire)</button>
                <button style="padding:12px; border:none; border-radius:6px; font-size:16px; cursor:pointer; font-weight:bold; background:#555; color:white;" onclick="closeModal()">Скасувати</button>
            </div>
        </div>
    `;
    let div = document.createElement('div');
    div.id = 'dynamic-modal';
    div.innerHTML = modalHtml;
    document.body.appendChild(div);
}

function closeModal() {
    let modal = document.getElementById('dynamic-modal');
    if (modal) modal.remove();
    selectedHero = null;
    selectedFolder = null;
}

function assignHero(team) {
    if (!selectedHero) return;

    // Перевірка, чи герой вже вибраний у будь-якій команді
    let isAlreadyPicked = radiantTeam.some(h => h && h.name === selectedHero) || 
                          direTeam.some(h => h && h.name === selectedHero);
    if (isAlreadyPicked) {
        alert('Цей герой вже обраний!');
        closeModal();
        return;
    }

    let heroObj = { name: selectedHero, folder: selectedFolder };

    if (team === 'radiant') {
        let idx = radiantTeam.indexOf(null);
        if (idx !== -1) {
            radiantTeam[idx] = heroObj;
        } else {
            alert('Усі слоти Radiant заповнені!');
        }
    } else if (team === 'dire') {
        let idx = direTeam.indexOf(null);
        if (idx !== -1) {
            direTeam[idx] = heroObj;
        } else {
            alert('Усі слоти Dire заповнені!');
        }
    }

    updateSlots();
    closeModal();
    back();

    // Перевірка завершення драфту (всі 10 слотів заповнені)
    let radiantComplete = radiantTeam.every(h => h !== null);
    let direComplete = direTeam.every(h => h !== null);

    if (radiantComplete && direComplete) {
        document.body.classList.add('draft-ended');
        
        // Примусовий перезапуск анімації обертання при повторному завершенні
        const rotateEl = document.querySelector('.vs-rotate');
        if (rotateEl) {
            rotateEl.style.animation = 'none';
            rotateEl.offsetHeight; // тригер перерахунку стилів (reflow)
            rotateEl.style.animation = 'fast-rotate 0.25s linear infinite';
        }

        // Зупинка швидкого обертання через 1.5 секунди (перехід у плавну пульсацію)
        setTimeout(() => {
            const rotateEl = document.querySelector('.vs-rotate');
            if (rotateEl) {
                rotateEl.style.animation = 'none';
            }
        }, 1500);

        // Запуск відправки драфту на сервер (сервер поверне реальні дані, анімації запустяться у відповіді сервера)
        sendDraftToTranslator();
    }
}

// Багатоетапна анімація лічильників вінрету (із sandbox.html)
function animateWinrates(targetR, targetD) {
    const elR = document.getElementById('radiant-winrate');
    const elD = document.getElementById('dire-winrate');

    if (!elR || !elD) return;

    elR.classList.add('visible');
    elD.classList.add('visible');

    const isWinR = targetR >= targetD;
    const minT = isWinR ? targetD : targetR;
    const maxT = isWinR ? targetR : targetD;

    let curR = 0;
    let curD = 0;

    // Етап 1: Обидва йдуть разом до меншого значення (2500мс)
    const dur1 = 2500;
    let st1 = null;

    function step1(ts) {
        if (!st1) st1 = ts;
        let p = Math.min((ts - st1) / dur1, 1);

        curR = minT * p;
        curD = minT * p;

        elR.textContent = curR.toFixed(2) + '%';
        elD.textContent = curD.toFixed(2) + '%';

        if (p < 1) {
            requestAnimationFrame(step1);
        } else {
            if (isWinR) {
                curD = targetD;
                elD.textContent = curD.toFixed(2) + '%';
            } else {
                curR = targetR;
                elR.textContent = curR.toFixed(2) + '%';
            }

            // Етап 2: Ривок лідера до свого максимуму з ефектом пульсації
            startPhase2(isWinR ? elR : elD, minT, maxT);
        }
    }

    function startPhase2(winEl, curr, fin) {
        winEl.classList.add('pulse');
        setTimeout(() => winEl.classList.remove('pulse'), 400);

        const dur2 = 600;
        let st2 = null;

        function step2(ts) {
            if (!st2) st2 = ts;
            let p = Math.min((ts - st2) / dur2, 1);
            let ep = 1 - Math.pow(1 - p, 3);
            let val = curr + (fin - curr) * ep;

            winEl.textContent = val.toFixed(2) + '%';

            if (p < 1) {
                requestAnimationFrame(step2);
            } else {
                winEl.textContent = fin.toFixed(2) + '%';
            }
        }

        requestAnimationFrame(step2);
    }

    requestAnimationFrame(step1);
}

function updateSlots() {
    let radiantContainer = document.getElementById('radiant-slots');
    radiantContainer.innerHTML = radiantTeam.map((hero, index) => {
        if (hero) {
            return `<div class="slot-wrapper" id="radiant-wrapper-${index}">
                        <div class="slot" onclick="handleSlotClick('radiant', ${index})">
                            <img src="${hero.folder}/${hero.name}.png" alt="${hero.name}">
                        </div>
                        <div class="remove-badge" onclick="removeHero('radiant', ${index})">✕</div>
                    </div>`;
        }
        return `<div class="slot-wrapper">
                    <div class="slot"></div>
                </div>`;
    }).join('');

    let direContainer = document.getElementById('dire-slots');
    direContainer.innerHTML = direTeam.map((hero, index) => {
        if (hero) {
            return `<div class="slot-wrapper" id="dire-wrapper-${index}">
                        <div class="slot" onclick="handleSlotClick('dire', ${index})">
                            <img src="${hero.folder}/${hero.name}.png" alt="${hero.name}">
                        </div>
                        <div class="remove-badge" onclick="removeHero('dire', ${index})">✕</div>
                    </div>`;
        }
        return `<div class="slot-wrapper">
                    <div class="slot"></div>
                </div>`;
    }).join('');
}

function handleSlotClick(team, index) {
    // Закрити всі інші відкриті плашки видалення
    document.querySelectorAll('.slot-wrapper').forEach(el => el.classList.remove('active-remove'));
    
    let wrapperId = `${team}-wrapper-${index}`;
    let wrapper = document.getElementById(wrapperId);
    if (wrapper) {
        wrapper.classList.add('active-remove');
    }
}

function removeHero(team, index) {
    if (team === 'radiant') {
        radiantTeam[index] = null;
    } else if (team === 'dire') {
        direTeam[index] = null;
    }

    // Якщо драфт був завершений, знімаємо клас draft-ended
    document.body.classList.remove('draft-ended');

    // Скидаємо стиль анімації обертання для наступного запуску
    const rotateEl = document.querySelector('.vs-rotate');
    if (rotateEl) {
        rotateEl.style.animation = '';
    }

    updateSlots();
}

// Закриття плашки видалення при кліку будь-де поза слотами
document.addEventListener('click', function(e) {
    if (!e.target.closest('.slot-wrapper')) {
        document.querySelectorAll('.slot-wrapper').forEach(el => el.classList.remove('active-remove'));
    }
});

// Функція відправки драфту на розрахунок
async function sendDraftToTranslator() {
    const radiantNames = radiantTeam.map(h => h ? h.name : null);
    const direNames = direTeam.map(h => h ? h.name : null);

    console.log("📥 Відправка драфту на сервер...");

    try {
        const response = await fetch('http://localhost:5001/api/calculate_draft', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ radiant: radiantNames, dire: direNames })
        });

        const result = await response.json();
        if (result.success) {
            console.log("✅ Результат аналізу:", result);
            
            // Розраховуємо реальні відсотки на основі radiant_score та dire_score
            const totalScore = result.radiant_score + result.dire_score;
            const radiantWinPct = totalScore > 0 ? (result.radiant_score / totalScore) * 100 : 50.0;
            const direWinPct = totalScore > 0 ? (result.dire_score / totalScore) * 100 : 50.0;

            // Визначаємо фаворита (хто має вищий скор або winner від сервака)
            const isRadiantFav = result.winner === 'Radiant';

            // Запускаємо анімацію вінретів та показ RP разом з FAVORITE через 800мс
            setTimeout(() => {
                animateWinrates(radiantWinPct, direWinPct);

                // Відображення балів RP
                const rRatingEl = document.getElementById('radiant-rating');
                const dRatingEl = document.getElementById('dire-rating');
                const rRatingContainer = document.getElementById('radiant-rating-container');
                const dRatingContainer = document.getElementById('dire-rating-container');

                if (rRatingEl) rRatingEl.textContent = result.radiant_raw_score;
                if (dRatingEl) dRatingEl.textContent = result.dire_raw_score;
                if (rRatingContainer) rRatingContainer.classList.add('visible');
                if (dRatingContainer) dRatingContainer.classList.add('visible');

                // Відображення плашки FAVORITE для команди-переможця
                const rFav = document.getElementById('radiant-favorite');
                const dFav = document.getElementById('dire-favorite');

                if (isRadiantFav && rFav) {
                    rFav.classList.add('visible');
                } else if (!isRadiantFav && dFav) {
                    dFav.classList.add('visible');
                }
            }, 800);

        } else {
            console.error('❌ Помилка аналізу:', result.error);
        }
    } catch (error) {
        console.error('❌ Помилка з\'єднання з сервером:', error);
    }
}

