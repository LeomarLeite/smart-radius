// Cole aqui a constante lrAutoRadiusConfig gerada pela interface
// Exemplo:
// const lrAutoRadiusConfig = { ... };
const lrAutoRadiusConfig = {
  "arredondado": true,
  "tipo": "%",
  "modo": "proprio",
  "base": "base-maior",
  "percent": 6,
  "px": 20,
  "useNativePercent": false,
  "corners": {
    "tl": true,
    "tr": true,
    "br": true,
    "bl": true
  }
};

function applyLrAutoRadius(config) {
  if (!config || config.arredondado === false) {
    document.querySelectorAll('.lr-smart-radius, .lr-smart-radius-top, .lr-smart-radius-bottom, .lr-smart-radius-left, .lr-smart-radius-right')
      .forEach(el => resetCorners(el));
    return;
  }

  const allClasses = [
    { class: '.lr-smart-radius', corners: ['tl', 'tr', 'br', 'bl'] },
    { class: '.lr-smart-radius-top', corners: ['tl', 'tr'] },
    { class: '.lr-smart-radius-bottom', corners: ['bl', 'br'] },
    { class: '.lr-smart-radius-left', corners: ['tl', 'bl'] },
    { class: '.lr-smart-radius-right', corners: ['tr', 'br'] },
  ];

  for (const entry of allClasses) {
    const elements = document.querySelectorAll(entry.class);
    if (config.tipo === '%') {
      let radiusList = [];
      elements.forEach(el => {
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        if (w === 0 || h === 0) return;
        let px = 0;
        if (config.useNativePercent) {
          applyCorners(el, config, config.percent + '%', entry.corners);
          radiusList.push(config.percent);
          return;
        }
        // Novos valores de base
        if (config.base === 'base-maior') px = Math.max(w, h) * (config.percent / 100);
        else if (config.base === 'base-menor') px = Math.min(w, h) * (config.percent / 100);
        else if (config.base === 'media' || config.base === 'quarto') px = ((w + h) / 4) * (config.percent / 100);
        radiusList.push(px);
      });
      if (radiusList.length === 0) continue;
      let applyRadius = radiusList;
      if (!config.useNativePercent) {
        // Novos valores de modo
        if (config.modo === 'maior' || config.modo === 'all-max') {
          const maxR = Math.max(...radiusList);
          applyRadius = radiusList.map(() => maxR);
        } else if (config.modo === 'menor' || config.modo === 'all-min') {
          const minR = Math.min(...radiusList);
          const safeMinR = isFinite(minR) ? Math.max(minR, 1) : 1;
          applyRadius = radiusList.map(() => safeMinR);
        }
        let idx = 0;
        elements.forEach(el => {
          const w = el.offsetWidth;
          const h = el.offsetHeight;
          if (w === 0 || h === 0) return;
          applyCorners(el, config, applyRadius[idx] + 'px', entry.corners);
          idx++;
        });
      }
    } else if (config.tipo === 'px') {
      elements.forEach(el => {
        applyCorners(el, config, config.px + 'px', entry.corners);
      });
    }
  }
}

function applyCorners(el, config, value, applyTo = ['tl', 'tr', 'br', 'bl']) {
  el.style.borderTopLeftRadius = (config.corners.tl && applyTo.includes('tl')) ? value : '0';
  el.style.borderTopRightRadius = (config.corners.tr && applyTo.includes('tr')) ? value : '0';
  el.style.borderBottomRightRadius = (config.corners.br && applyTo.includes('br')) ? value : '0';
  el.style.borderBottomLeftRadius = (config.corners.bl && applyTo.includes('bl')) ? value : '0';
}

function resetCorners(el) {
  el.style.borderRadius = '0';
  el.style.borderTopLeftRadius = '0';
  el.style.borderTopRightRadius = '0';
  el.style.borderBottomRightRadius = '0';
  el.style.borderBottomLeftRadius = '0';
}

// Aplica automaticamente ao carregar a página
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      applyLrAutoRadius(lrAutoRadiusConfig);
    });
  } else {
    applyLrAutoRadius(lrAutoRadiusConfig);
  }
}
