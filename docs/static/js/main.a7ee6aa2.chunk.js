(this.webpackJsonpyoutubify=this.webpackJsonpyoutubify||[]).push([[0],{107:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),u=n(52),c=n.n(u),o=n(12),i=n.n(o),l=n(22),s=n(13),f=(n(60),n(31)),p=n(53),m=n.n(p);function d(e,t){var n=[];return function e(a){if(Array.isArray(a)){var r=!0,u=!1,c=void 0;try{for(var o,i=a[Symbol.iterator]();!(r=(o=i.next()).done);r=!0){var l=e(o.value);void 0!==l&&n.push(l)}}catch(d){u=!0,c=d}finally{try{r||null==i.return||i.return()}finally{if(u)throw c}}}else if("object"===typeof a)for(var s=0,f=Object.keys(a);s<f.length;s++){var p=f[s];if(p===t)n.push(a[p]);else{var m=e(a[p]);void 0!==m&&n.push(m)}}}(e),n.filter((function(e,t,n){return n.indexOf(e)===t}))}var h=window.fetch;function b(e){return y.apply(this,arguments)}function y(){return(y=Object(l.a)(i.a.mark((function e(t){var n,a,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=function(e){return!!e.mimeType&&e.mimeType.includes("audio/mp4")},e.next=3,m.a.getInfo(t,{filter:n});case 3:return a=e.sent,r=a.player_response.streamingData.adaptiveFormats.filter((function(e){return e.mimeType.includes("audio/mp4")})),e.abrupt("return",r[0].url);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function v(e){return fetch(e).then((function(e){return e.text()})).then((function(e){return e="undefined"!==typeof window.orientation?e.split('<div id="initial-data">\x3c!-- {')[1].split("} --\x3e</div>")[0]:e.split('window["ytInitialData"] = {')[1].split("};")[0],JSON.parse("{"+e+"}")}))}window.fetch=function(e,t){return"string"===typeof e&&(e.includes("youtube.com")||e.includes("googlevideo.com"))&&(e="https://cors-anywhere.herokuapp.com/"+e,t=Object(f.a)({},t||{},{headers:Object(f.a)({},t&&t.headers||{},{Origin:"*"})})),h(e,t)};var w=function(){var e=Object(a.useState)(""),t=Object(s.a)(e,2),n=t[0],u=t[1],c=Object(a.useState)(""),o=Object(s.a)(c,2),f=o[0],p=o[1],m=Object(a.useState)(),h=Object(s.a)(m,2),y=h[0],w=h[1],E=Object(a.useState)(""),O=Object(s.a)(E,2),j=O[0],g=O[1],k=Object(a.useState)(),x=Object(s.a)(k,2),C=x[0],I=x[1],S=Object(a.useCallback)((function(e){var t=e.target.value;switch(e.target.name){case"url":return u(t);case"userId":return p(t);case"playlistId":return g(t);default:return}}),[u]),A=Object(a.useCallback)((function(){var e;(e=f||"",v("https://youtube.com/user/".concat(e,"/playlists")).catch((function(){return v("https://youtube.com/channel/".concat(e,"/playlists"))})).then((function(e){return d(e,"playlistId")}))).then((function(e){w(e)}))}),[f,w]),F=Object(a.useCallback)((function(){(function(e){return v("https://youtube.com/playlist?list=".concat(e)).then((function(e){return d(e,"videoId")}))})(j||"").then((function(e){I(e)}))}),[j,I]),G=Object(a.useCallback)(Object(l.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b(n||"");case 2:t=e.sent,u(t);case 4:case"end":return e.stop()}}),e)}))),[u,n]);return r.a.createElement("div",{className:"App"},r.a.createElement("h1",null,"Youtubify"),r.a.createElement("input",{placeholder:"youtube user id",name:"userId",value:f,onChange:S}),r.a.createElement("button",{onClick:A},"Go"),y&&r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"Playlists"),y.map((function(e,t){return r.a.createElement("p",{key:t},e)}))),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("input",{placeholder:"youtube playlist id",name:"playlistId",value:j,onChange:S}),r.a.createElement("button",{onClick:F},"Go"),C&&r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"Videos"),C.map((function(e,t){return r.a.createElement("p",{key:t},e)}))),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("input",{placeholder:"youtube video id",name:"url",value:n,onChange:S}),r.a.createElement("button",{onClick:G},"Go"),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("audio",{autoPlay:!0,controls:!0,src:n}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},54:function(e,t,n){e.exports=n(107)},60:function(e,t,n){},64:function(e,t){},66:function(e,t){},80:function(e,t){},82:function(e,t){}},[[54,1,2]]]);
//# sourceMappingURL=main.a7ee6aa2.chunk.js.map