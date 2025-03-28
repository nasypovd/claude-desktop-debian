// Modified function for MainWindowPage component to add window controls
// This should be added to ./build/electron-app/app.asar.contents/.vite/renderer/main_window/assets/MainWindowPage-DAp51Uug.js

function u({isMainWindow:e,windowTitle:t,titleBarHeight:n=e?l:a}){
  if(!d&&e) return null;
  
  // App icon and hamburger menu (left side)
  const i=e?L.jsxs("div",{
    className:"items-center ms-3 flex nc-no-drag",
    style:{height:n},
    id:"app-icon-container",
    children:[
      L.jsx("svg",{
        id:"hamburger-menu",
        width:"16",
        height:"16",
        viewBox:"0 0 24 24",
        onClick:()=>{window.mainProcess.titleBarApi.requestMainMenuPopup()},
        fill:"none",
        xmlns:"http://www.w3.org/2000/svg",
        children:L.jsxs("g",{
          style:{stroke:"var(--claude-foreground-color)"},
          children:[
            L.jsx("path",{d:"M4 18L20 18",strokeWidth:"2",strokeLinecap:"round"}),
            L.jsx("path",{d:"M4 12L20 12",strokeWidth:"2",strokeLinecap:"round"}),
            L.jsx("path",{d:"M4 6L20 6",strokeWidth:"2",strokeLinecap:"round"})
          ]
        })
      }),
      L.jsx(c,{width:16,height:16,style:{marginLeft:12,height:16}})
    ]
  }):null;
  
  // Title bar (center)
  const r=L.jsx("div",{
    className:"flex flex-row items-center justify-center select-none nc-drag",
    style:{height:`${n}px`},
    children:L.jsx("h1",{
      className:"text-xs text-center self-center opacity-40 font-bold select-none",
      id:"titleBar",
      children:t
    })
  });
  
  // Window controls (right side) - NEW ADDITION
  const windowControls = e ? L.jsxs("div", {
    className: "flex flex-row items-center justify-end absolute right-0 top-0 nc-no-drag",
    style: {height: n},
    children: [
      // Minimize button
      L.jsx("div", {
        className: "px-3 h-full flex items-center justify-center hover:bg-bg-300",
        onClick: () => { window.mainProcess.windowControlsApi.minimize(); },
        children: L.jsx("svg", {
          width: "12",
          height: "12",
          viewBox: "0 0 12 12",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: L.jsx("rect", {
            x: "2",
            y: "5.5",
            width: "8",
            height: "1",
            fill: "currentColor"
          })
        })
      }),
      
      // Settings/Options button (three dots)
      L.jsx("div", {
        className: "px-3 h-full flex items-center justify-center hover:bg-bg-300",
        onClick: () => { window.mainProcess.titleBarApi.openSettingsPopup(); },
        children: L.jsx("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: L.jsxs("g", {
            fill: "currentColor",
            children: [
              L.jsx("circle", { cx: "8", cy: "4", r: "1.5" }),
              L.jsx("circle", { cx: "8", cy: "8", r: "1.5" }),
              L.jsx("circle", { cx: "8", cy: "12", r: "1.5" })
            ]
          })
        })
      }),
      
      // Close button
      L.jsx("div", {
        className: "px-3 h-full flex items-center justify-center hover:bg-danger-200",
        onClick: () => { window.mainProcess.windowControlsApi.close(); },
        children: L.jsx("svg", {
          width: "12",
          height: "12",
          viewBox: "0 0 12 12",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: L.jsxs("g", {
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            children: [
              L.jsx("path", { d: "M2 2L10 10" }),
              L.jsx("path", { d: "M10 2L2 10" })
            ]
          })
        })
      })
    ]
  }) : null;
  
  // Left side content depending on window type
  const o = e ? L.jsx(L.Fragment, { children: i }) : L.jsx("div", {});
  
  return L.jsxs(L.Fragment, {
    children: [
      r, // Title
      L.jsxs("div", {
        className: "absolute top-0 left-0 right-0 flex flex-row items-center select-none nc-drag",
        style: {height: `${n+1}px`, borderBottom: "1px solid rgba(0,0,0,0.1)"},
        children: [
          o, // Left side content
          windowControls // Add window controls on the right
        ]
      })
    ]
  });
}
