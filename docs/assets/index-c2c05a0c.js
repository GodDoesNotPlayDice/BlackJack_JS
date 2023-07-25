(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const d of a)if(d.type==="childList")for(const h of d.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&n(h)}).observe(document,{childList:!0,subtree:!0});function e(a){const d={};return a.integrity&&(d.integrity=a.integrity),a.referrerPolicy&&(d.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?d.credentials="include":a.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function n(a){if(a.ep)return;a.ep=!0;const d=e(a);fetch(a.href,d)}})();const M=()=>{const c=["C","D","H","S"],t=["A","J","Q","K"],e=[];for(let n=2;n<=10;n++)c.forEach(a=>e.push(n+a));return c.forEach(n=>{t.forEach(a=>e.push(a+n))}),D(e)},D=c=>{const t=[...c];for(let e=t.length-1;e>0;e--){const n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t},w=c=>{if(c.length===0)throw"Here is no cards in the deck";let t=c[Math.floor(Math.random()*c.length)];return c.splice(c.indexOf(t),1),total_cards.innerText=c.length,t},_=(c,t)=>{let e=parseInt(c);return isNaN(e)&&(c=c.substring(0,1),e==="A"?t+11<21?e=11:e=1:e=10),e};(()=>{const c=document.querySelector("#new_game"),t=document.querySelector("#to_hit"),e=document.querySelector("#to_stand"),n=document.querySelector("#total_cards"),a=document.querySelector("#player_cards"),d=document.querySelector("#player_pts"),h=document.querySelector("#bot_pts"),u=document.querySelector("#bot_cards"),m=document.querySelector("#win"),b=document.querySelector("#lose"),v=document.querySelector("#push");Swal.fire("How to play?",`The goal of blackjack is to beat the dealer's hand without going over 21. Face cards are worth 10. Aces are worth 1 or 11, whichever makes a better hand. Each player starts with two cards, one of the dealer's cards is hidden until the end. For start the game, click on the button "New Game".`,"question");let p=[],k=[],E=[],l=0,L=[],S=[],i=0,f=!1;const x=(r,s,o)=>{r=r.sort();for(let g of r){if(s===21)break;if(r[0].substring(0,1)==="A"&&r[1].substring(0,1)==="A"){s=12;break}let C=g.substring(0,1);if(C==="A")for(let O of r){let A=O.substring(0,1);if(C!==A)if(A==="K"||A==="Q"||A==="J"){s=21;break}else s+=_(C,s)}else s+=_(g,s)}return s},T=()=>{for(;a.firstChild;)a.removeChild(a.firstChild);for(;u.firstChild;)u.removeChild(u.firstChild);p=M(),m.classList.contains("hidden")||m.classList.add("hidden"),b.classList.contains("hidden")||b.classList.add("hidden"),v.classList.contains("hidden")||v.classList.add("hidden"),t.classList.contains("opacity-50")&&t.classList.replace("opacity-50","opacity-100"),e.classList.contains("opacity-50")&&e.classList.replace("opacity-50","opacity-100"),t.disabled=!1,e.disabled=!1,f=!1,k=[],L=[],l=0,i=0,h.innerText=0,E=[],S=[];for(let r=0;r<2;r++){let s=w(p);const o=document.createElement("img");o.setAttribute("src",`./cards/${s}.png`),k.push(s),o.classList.add("w-20","lg:w-28","relative","left-28","-ml-16"),E.push(o);for(let g of E)a.append(g)}for(let r=0;r<2;r++){let s=w(p);L.push(s);const o=document.createElement("img");o.setAttribute("src","./back_cards/red_back.png"),o.classList.add("w-20","lg:w-28","relative","left-28","-ml-16"),S.push(o);for(let g of L)u.append(o)}l=x(k,l),i=x(L,i),i>=21&&(h.innerText=21,b.classList.remove("hidden"),e.classList.remove("opacity-100"),t.classList.remove("opacity-100"),t.classList.add("opacity-50"),e.classList.add("opacity-50"),t.disabled=!0,e.disabled=!0,q()),l>=21&&(f=!0,m.classList.remove("hidden"),e.classList.remove("opacity-100"),t.classList.remove("opacity-100"),t.classList.add("opacity-50"),e.classList.add("opacity-50"),t.disabled=!0,e.disabled=!0,q()),d.innerText=l,n.innerText=p.length},N=r=>{if(r>18){if(f===!1)return;y(r)}else{let s=w(p);const o=document.createElement("img");return o.setAttribute("src","./back_cards/red_back.png"),o.classList.add("w-20","lg:w-28","relative","left-28","-ml-16"),S.push(o),u.append(o),L.push(s),i+=_(s,i),r}},q=()=>{for(;u.firstChild;)u.removeChild(u.firstChild);for(let r of L){const s=document.createElement("img");s.setAttribute("src",`./cards/${r}.png`),s.classList.add("w-20","lg:w-28","relative","left-28","-ml-16"),S.push(s),u.append(s)}h.innerText=i},y=r=>{if(r>19&&r<21)q();else{for(;r<18;){let s=w(p);L.push(s),i+=_(s,i),r=i}q()}};c.addEventListener("click",r=>{T()}),t.addEventListener("click",r=>{const s=document.createElement("img");let o=w(p);if(s.setAttribute("src",`./cards/${o}.png`),s.classList.add("w-20","lg:w-28","relative","left-28","-ml-16"),E.push(s),l+=_(o,l),a.append(s),d.innerText=l,N(i),l===21){f=!0,m.classList.remove("hidden"),e.classList.remove("opacity-100"),t.classList.remove("opacity-100"),t.classList.add("opacity-50"),e.classList.add("opacity-50"),t.disabled=!0,e.disabled=!0,y(i);return}else if(i>21&&l>21){f=!0,v.classList.remove("hidden"),t.classList.replace("opacity-100","opacity-50"),t.disabled=!0,e.classList.replace("opacity-100","opacity-50"),e.disabled=!0,y(i);return}else if(i===l){f=!0,v.classList.remove("hidden"),e.classList.remove("opacity-100"),t.classList.remove("opacity-100"),t.classList.add("opacity-50"),e.classList.add("opacity-50"),t.disabled=!0,e.disabled=!0,y(i);return}else if(l>21){f=!0,b.classList.remove("hidden"),e.classList.remove("opacity-100"),t.classList.remove("opacity-100"),t.classList.add("opacity-50"),e.classList.add("opacity-50"),t.disabled=!0,e.disabled=!0,y(i);return}}),e.addEventListener("click",r=>{f=!0,e.classList.remove("opacity-100"),t.classList.remove("opacity-100"),t.classList.add("opacity-50"),e.classList.add("opacity-50"),e.disabled=!0,t.disabled=!0,y(i),i===21&&b.classList.remove("hidden"),i>21&&m.classList.remove("hidden"),i<21&&i>l&&b.classList.remove("hidden"),i<21&&i<l&&m.classList.remove("hidden"),i<21&&i===l&&m.classList.remove("hidden"),i===l&&v.classList.remove("hidden")})})();
