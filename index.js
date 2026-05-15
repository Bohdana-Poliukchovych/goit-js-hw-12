import{a as w,S,i}from"./assets/vendor-DcHCnVjq.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))u(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&u(l)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function u(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const P="55777204-657361ff26fdbc8510979d0fd",v="https://pixabay.com/api/";async function f(o,e){return(await w.get(v,{params:{key:P,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:15}})).data}const m=document.querySelector(".gallery"),g=document.querySelector(".loader"),p=document.querySelector(".load-more"),R=new S(".gallery a",{captionsData:"alt",captionDelay:250});function h(o){const e=o.map(s=>`
        <li class="gallery-item">
            <a class="gallery-link" href="${s.largeImageURL}">
            <img
            class="gallery-image"
            src="${s.webformatURL}"
            alt="${s.tags}"/> 
            </a>

            <ul class="info">
            <li class="info-item"><b>Likes</b><span>${s.likes}</span></li>
            <li class="info-item"><b>Views</b><span>${s.views}</span></li>
            <li class="info-item"><b>Comments</b><span>${s.comments}</span></li>
            <li class="info-item"><b>Downloads</b><span>${s.downloads}</span></li>
            </ul>
        </li>`).join("");m.insertAdjacentHTML("beforeend",e),R.refresh()}function q(){m.innerHTML=""}function y(){g.classList.remove("is-hidden")}function L(){g.classList.add("is-hidden")}function b(){p.classList.remove("is-hidden")}function c(){p.classList.add("is-hidden")}const M=document.querySelector(".form"),B=document.querySelector(".load-more");let a="",n=1,d=0;M.addEventListener("submit",$);B.addEventListener("click",x);async function $(o){if(o.preventDefault(),a=o.target.elements["search-text"].value.trim(),!a){i.warning({message:"Please enter search text",position:"topRight"});return}n=1,q(),c(),y();try{const e=await f(a,n);if(e.hits.length===0){i.error({message:"Sorry, there are no images matching your search query.Please try again!",position:"topRight"});return}h(e.hits),d=Math.ceil(e.totalHits/15),n<d&&b(),i.success({message:`Hooray! We found ${e.totalHits} images.`,position:"topRight"})}catch{i.error({message:"Something went wrong.Please try again later.",position:"topRight"})}finally{L()}}async function x(){n+=1,c(),y();try{const o=await f(a,n);if(h(o.hits),H(),n>=d){c(),i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}b()}catch{i.error({message:"Something went wrong.Please try again later.",position:"topRight"})}finally{L()}}function H(){const o=document.querySelector(".gallery-item");if(!o)return;const e=o.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
