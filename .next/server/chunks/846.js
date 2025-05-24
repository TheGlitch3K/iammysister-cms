"use strict";exports.id=846,exports.ids=[846],exports.modules={9397:(e,r,s)=>{s.a(e,async(e,i)=>{try{s.d(r,{Z:()=>NotesManager});var n=s(997),t=s(6689),a=s(4115),o=s(3766),d=s(1012),l=s(3696),c=s(1352),m=s(3718),h=s(6789),x=e([a]);a=(x.then?(await x)():x)[0];let u=a.default.div`
  background: #F9FAFB;
  border-radius: 0.75rem;
  padding: 1.5rem;
  height: fit-content;
  border: 1px solid #E5E7EB;
`,g=a.default.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  h4 {
    font-size: 1rem;
    font-weight: 600;
    color: #111827;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`,p=a.default.button`
  padding: 0.5rem;
  background: #14B8A6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  
  &:hover {
    background: #0F766E;
  }
`,f=a.default.div`
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 1rem;
`,j=a.default.div`
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 0.75rem;
  
  .note-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.5rem;
  }
  
  .note-date {
    font-size: 0.75rem;
    color: #6B7280;
    font-weight: 500;
  }
  
  .note-actions {
    display: flex;
    gap: 0.25rem;
  }
  
  .note-action {
    background: none;
    border: none;
    color: #6B7280;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 0.25rem;
    
    &:hover {
      color: #EF4444;
      background: #FEE2E2;
    }
  }
  
  .note-content {
    font-size: 0.875rem;
    color: #374151;
    line-height: 1.4;
    margin-bottom: 0.5rem;
  }
  
  .reminder-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    background: #FEF3C7;
    color: #92400E;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 500;
  }
`,b=a.default.div`
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.5rem;
  }
  
  .form-textarea {
    width: 100%;
    min-height: 80px;
    padding: 0.75rem;
    border: 1px solid #D1D5DB;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    resize: vertical;
    font-family: inherit;
    
    &:focus {
      outline: none;
      border-color: #14B8A6;
      box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
    }
  }
  
  .form-select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #D1D5DB;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    
    &:focus {
      outline: none;
      border-color: #14B8A6;
      box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
    }
  }
  
  .form-actions {
    display: flex;
    gap: 0.5rem;
  }
  
  .btn-save {
    flex: 1;
    padding: 0.5rem;
    background: #14B8A6;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    
    &:hover {
      background: #0F766E;
    }
  }
  
  .btn-cancel {
    padding: 0.5rem;
    background: #F3F4F6;
    color: #374151;
    border: none;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    cursor: pointer;
    
    &:hover {
      background: #E5E7EB;
    }
  }
`,v=a.default.div`
  text-align: center;
  padding: 2rem;
  color: #6B7280;
  font-size: 0.875rem;
`;function NotesManager({sisterId:e,initialNotes:r=[],onNotesUpdate:s}){let[i,a]=(0,t.useState)(r),[x,N]=(0,t.useState)(!1),[y,w]=(0,t.useState)(""),[E,k]=(0,t.useState)("none"),formatDateTime=e=>new Date(e).toLocaleString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}),deleteNote=r=>{let n=i.filter(e=>e.id!==r);a(n),s&&s(e,n)};return(0,n.jsxs)(u,{children:[(0,n.jsxs)(g,{children:[(0,n.jsxs)("h4",{children:[n.jsx(o.Z,{size:16}),"Admin Notes"]}),!x&&(0,n.jsxs)(p,{onClick:()=>N(!0),children:[n.jsx(d.Z,{size:14}),"Add Note"]})]}),x&&(0,n.jsxs)(b,{children:[(0,n.jsxs)("div",{className:"form-group",children:[n.jsx("label",{className:"form-label",children:"Note Content"}),n.jsx("textarea",{className:"form-textarea",value:y,onChange:e=>w(e.target.value),placeholder:"Add your note about this sister...",autoFocus:!0})]}),(0,n.jsxs)("div",{className:"form-group",children:[n.jsx("label",{className:"form-label",children:"Set Reminder"}),(0,n.jsxs)("select",{className:"form-select",value:E,onChange:e=>k(e.target.value),children:[n.jsx("option",{value:"none",children:"No Reminder"}),n.jsx("option",{value:"tomorrow",children:"Tomorrow"}),n.jsx("option",{value:"week",children:"Next Week"})]})]}),(0,n.jsxs)("div",{className:"form-actions",children:[(0,n.jsxs)("button",{className:"btn-save",onClick:()=>{if(!y.trim())return;let r={id:Date.now(),content:y.trim(),createdAt:new Date,reminderType:E,reminderDate:"none"!==E?new Date(Date.now()+("tomorrow"===E?864e5:6048e5)):null},n=[r,...i];a(n),w(""),k("none"),N(!1),s&&s(e,n)},children:[n.jsx(l.Z,{size:14}),"Save Note"]}),(0,n.jsxs)("button",{className:"btn-cancel",onClick:()=>{N(!1),w(""),k("none")},children:[n.jsx(c.Z,{size:14}),"Cancel"]})]})]}),n.jsx(f,{children:0===i.length?n.jsx(v,{children:'No notes yet. Click "Add Note" to create your first admin note.'}):i.map(e=>(0,n.jsxs)(j,{children:[(0,n.jsxs)("div",{className:"note-header",children:[n.jsx("span",{className:"note-date",children:formatDateTime(e.createdAt)}),n.jsx("div",{className:"note-actions",children:n.jsx("button",{className:"note-action",onClick:()=>deleteNote(e.id),children:n.jsx(m.Z,{size:12})})})]}),n.jsx("div",{className:"note-content",children:e.content}),e.reminderDate&&(0,n.jsxs)("div",{className:"reminder-badge",children:[n.jsx(h.Z,{size:12}),"Reminder: ",formatDateTime(e.reminderDate)]})]},e.id))})]})}i()}catch(e){i(e)}})},5846:(e,r,s)=>{s.a(e,async(e,i)=>{try{s.d(r,{Z:()=>QuickView});var n=s(997),t=s(6689),a=s(4115),o=s(3139),d=s(7480),l=s(7928),c=s(1352),m=s(9769),h=s(5097),x=s(6953),u=s(4622),g=s(8621),p=s(6942),f=s(9589),j=s(9525),b=s(1914),v=s(8909),N=s(4976),y=s(6330),w=s(3510),E=s(7420),k=s(8272),z=s(9397),S=e([a,o,z]);[a,o,z]=S.then?(await S)():S;let F=o.keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`,C=o.keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`,Z=o.keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`,$=a.default.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  animation: ${Z} 0.3s ease-out;
  backdrop-filter: blur(4px);
`,A=a.default.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: ${e=>e.isExpanded?"80vw":"500px"};
  max-width: ${e=>e.isExpanded?"none":"90vw"};
  background: white;
  box-shadow: -10px 0 25px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  animation: ${e=>e.isClosing?C:F} 0.4s ease-out;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: width 0.3s ease;
`,D=a.default.div`
  background: linear-gradient(135deg, #14B8A6, #F59E0B);
  color: white;
  padding: 2rem;
  position: relative;
`,B=a.default.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`,I=a.default.div`
  display: flex;
  gap: 0.5rem;
`,T=a.default.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`,R=a.default.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`,M=a.default.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
`,U=a.default.div`
  flex: 1;
  
  .name {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  .program {
    font-size: 0.875rem;
    opacity: 0.9;
    margin-bottom: 0.25rem;
  }
  
  .status {
    font-size: 0.75rem;
    opacity: 0.8;
  }
`,L=a.default.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-top: 1rem;
`,H=a.default.button`
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }

  &:active {
    background: rgba(255, 255, 255, 0.4);
    transform: scale(0.95);
  }
`,P=a.default.div`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  display: ${e=>e.isExpanded?"grid":"block"};
  grid-template-columns: ${e=>e.isExpanded?"2fr 1fr":"none"};
  gap: ${e=>e.isExpanded?"2rem":"0"};
`,Y=a.default.div`
  ${e=>e.isExpanded?"":"width: 100%;"}
`,q=a.default.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`,O=a.default.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`,X=a.default.div`
  display: grid;
  grid-template-columns: ${e=>e.isExpanded?"repeat(3, 1fr)":"1fr 1fr"};
  gap: 1rem;
  margin-bottom: 1.5rem;
`,_=a.default.div`
  .label {
    font-size: 0.75rem;
    color: #6B7280;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  .value {
    font-size: 0.875rem;
    color: #111827;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`,W=a.default.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #F9FAFB;
  border-radius: 0.5rem;
`,J=a.default.div`
  text-align: center;
  
  .value {
    font-size: 1.25rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
  }
  
  .label {
    font-size: 0.75rem;
    color: #6B7280;
    text-transform: uppercase;
    font-weight: 600;
  }
`,Q=a.default.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 1rem;
  
  ${e=>{switch(e.status){case"new":return"background: #DBEAFE; color: #1E40AF;";case"active":return"background: #D1FAE5; color: #065F46;";case"high-priority":return"background: #FEE2E2; color: #991B1B;";case"qualified":return"background: #FEF3C7; color: #92400E;";case"graduated":return"background: #EDE9FE; color: #6B21A8;";default:return"background: #F3F4F6; color: #374151;"}}}
`,V=a.default.div`
  background: ${e=>e.urgent?"#FEF3C7":"#F0FDFA"};
  border: 1px solid ${e=>e.urgent?"#FCD34D":"#A7F3D0"};
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  
  .title {
    font-weight: 600;
    color: ${e=>e.urgent?"#92400E":"#065F46"};
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .content {
    color: ${e=>e.urgent?"#92400E":"#065F46"};
    font-size: 0.875rem;
    line-height: 1.4;
  }
`,G=a.default.button`
  width: 100%;
  padding: 0.75rem;
  background: #14B8A6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: #0F766E;
    transform: translateY(-1px);
  }
`,K=(0,a.default)(G)`
  background: #F59E0B;
  
  &:hover {
    background: #D97706;
  }
`;function QuickView({sister:e,onClose:r,onUpdate:s}){var i,a,o;let[S,F]=(0,t.useState)(!1),[C,Z]=(0,t.useState)(!1),handleClose=()=>{F(!0),setTimeout(()=>{r()},400)},handleText=()=>{if(e.phone){let r=`Hi ${e.firstName}, this is from I AM MY SISTER. How can we support you today?`;window.open(`sms:${e.phone}?body=${encodeURIComponent(r)}`,"_self")}},handleSchedule=()=>{let r=`Meeting with ${e.firstName} ${e.lastName}`,s=`Sister: ${e.firstName} ${e.lastName}
Program: ${e.program}
Phone: ${e.phone}
Email: ${e.email}`,i=new Date;i.setDate(i.getDate()+1),i.setHours(10,0,0);let n=`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(r)}&details=${encodeURIComponent(s)}&dates=${i.toISOString().replace(/[-:]/g,"").split(".")[0]}Z/${new Date(i.getTime()+36e5).toISOString().replace(/[-:]/g,"").split(".")[0]}Z`;window.open(n,"_blank")};return((0,t.useEffect)(()=>{let handleEscape=e=>{"Escape"===e.key&&handleClose()};return document.addEventListener("keydown",handleEscape),()=>document.removeEventListener("keydown",handleEscape)},[]),e)?(0,n.jsxs)(n.Fragment,{children:[n.jsx($,{onClick:handleClose}),(0,n.jsxs)(A,{isClosing:S,isExpanded:C,children:[(0,n.jsxs)(D,{children:[(0,n.jsxs)(B,{children:[n.jsx("div",{style:{fontSize:"0.875rem",opacity:"0.9"},children:"Sister Profile"}),(0,n.jsxs)(I,{children:[n.jsx(T,{onClick:()=>{Z(!C)},title:C?"Minimize":"Expand",children:C?n.jsx(d.Z,{size:20}):n.jsx(l.Z,{size:20})}),n.jsx(T,{onClick:handleClose,children:n.jsx(c.Z,{size:20})})]})]}),(0,n.jsxs)(R,{children:[(0,n.jsxs)(M,{children:[e.firstName?.[0]||"S",e.lastName?.[0]||"S"]}),(0,n.jsxs)(U,{children:[(0,n.jsxs)("div",{className:"name",children:[e.firstName," ",e.lastName]}),n.jsx("div",{className:"program",children:e.program||"Unassigned Program"}),(0,n.jsxs)("div",{className:"status",children:["Joined ",(i=e.timestamp||e.createdAt,new Date(i).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}))]})]})]}),(0,n.jsxs)(L,{children:[(0,n.jsxs)(H,{onClick:()=>{e.phone&&window.open(`tel:${e.phone}`,"_self")},children:[n.jsx(m.Z,{size:14}),"Call"]}),(0,n.jsxs)(H,{onClick:handleText,children:[n.jsx(h.Z,{size:14}),"Text"]}),(0,n.jsxs)(H,{onClick:()=>{if(e.email){let r=`Dear ${e.firstName},

Thank you for submitting your application to I AM MY SISTER. We are reviewing your information and will be in touch soon.

Best regards,
I AM MY SISTER Team`;window.open(`mailto:${e.email}?subject=${encodeURIComponent("Following up on your I AM MY SISTER application")}&body=${encodeURIComponent(r)}`,"_self")}},children:[n.jsx(x.Z,{size:14}),"Email"]}),(0,n.jsxs)(H,{onClick:handleSchedule,children:[n.jsx(u.Z,{size:14}),"Schedule"]})]})]}),(0,n.jsxs)(P,{isExpanded:C,children:[(0,n.jsxs)(Y,{isExpanded:C,children:[(0,n.jsxs)(W,{children:[(0,n.jsxs)(J,{children:[(0,n.jsxs)("div",{className:"value",style:{color:(a=e.creditScore||0)>=700?"#10B981":a>=600?"#F59E0B":"#EF4444"},children:[n.jsx(g.Z,{size:16}),e.creditScore||"N/A"]}),n.jsx("div",{className:"label",children:"Credit Score"})]}),(0,n.jsxs)(J,{children:[(0,n.jsxs)("div",{className:"value",children:[n.jsx(p.Z,{size:16}),"$",(e.monthlyIncome||0).toLocaleString()]}),n.jsx("div",{className:"label",children:"Monthly Income"})]}),(0,n.jsxs)(J,{children:[n.jsx("div",{className:"value",children:(o=e.mentalScore||0,(0,n.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"0.25rem"},children:[n.jsx("div",{style:{display:"flex",gap:"2px"},children:[...Array(10)].map((e,r)=>n.jsx("div",{style:{width:"8px",height:"8px",borderRadius:"50%",background:r<o?"#EC4899":"#E5E7EB"}},r))}),(0,n.jsxs)("span",{children:[o,"/10"]})]}))}),n.jsx("div",{className:"label",children:"Wellness"})]})]}),n.jsx(q,{children:(0,n.jsxs)(Q,{status:e.status,children:[n.jsx(f.Z,{size:12}),e.status||"Unknown"]})}),(0,n.jsxs)(q,{children:[(0,n.jsxs)(O,{children:[n.jsx(j.Z,{size:16}),"Contact Information"]}),(0,n.jsxs)(X,{isExpanded:C,children:[(0,n.jsxs)(_,{children:[n.jsx("div",{className:"label",children:"Email"}),(0,n.jsxs)("div",{className:"value",children:[n.jsx(x.Z,{size:14}),e.email||"Not provided"]})]}),(0,n.jsxs)(_,{children:[n.jsx("div",{className:"label",children:"Phone"}),(0,n.jsxs)("div",{className:"value",children:[n.jsx(m.Z,{size:14}),e.phone||"Not provided"]})]}),(0,n.jsxs)(_,{children:[n.jsx("div",{className:"label",children:"Household Size"}),(0,n.jsxs)("div",{className:"value",children:[n.jsx(j.Z,{size:14}),e.householdSize||1," people"]})]}),(0,n.jsxs)(_,{children:[n.jsx("div",{className:"label",children:"Program"}),(0,n.jsxs)("div",{className:"value",children:[n.jsx(b.Z,{size:14}),e.program||"Unassigned"]})]})]})]}),(0,n.jsxs)(q,{children:[(0,n.jsxs)(O,{children:[n.jsx(g.Z,{size:16}),"Financial Overview"]}),(0,n.jsxs)(X,{isExpanded:C,children:[(0,n.jsxs)(_,{children:[n.jsx("div",{className:"label",children:"Credit Report Reviewed"}),n.jsx("div",{className:"value",children:e.creditReviewed||"Unknown"})]}),(0,n.jsxs)(_,{children:[n.jsx("div",{className:"label",children:"Employment Length"}),(0,n.jsxs)("div",{className:"value",children:[n.jsx(v.Z,{size:14}),e.employmentLength||"Not specified"]})]}),(0,n.jsxs)(_,{children:[n.jsx("div",{className:"label",children:"Savings Account"}),n.jsx("div",{className:"value",children:e.hasSavings||"Unknown"})]}),(0,n.jsxs)(_,{children:[n.jsx("div",{className:"label",children:"Savings Amount"}),(0,n.jsxs)("div",{className:"value",children:[n.jsx(p.Z,{size:14}),"$",(e.savingsAmount||0).toLocaleString()]})]}),(0,n.jsxs)(_,{children:[n.jsx("div",{className:"label",children:"Budget Frequency"}),n.jsx("div",{className:"value",children:e.budgetFrequency||"Unknown"})]}),(0,n.jsxs)(_,{children:[n.jsx("div",{className:"label",children:"Overdraft Frequency"}),n.jsx("div",{className:"value",children:e.overdraftFreq||"Unknown"})]})]})]}),e.housingStatus&&"Looking"!==e.housingStatus&&(0,n.jsxs)(q,{children:[(0,n.jsxs)(O,{children:[n.jsx(N.Z,{size:16}),"Housing Journey"]}),(0,n.jsxs)(X,{isExpanded:C,children:[(0,n.jsxs)(_,{children:[n.jsx("div",{className:"label",children:"Housing Status"}),(0,n.jsxs)("div",{className:"value",children:[n.jsx(y.Z,{size:14}),e.housingStatus]})]}),e.realtorInfo&&(0,n.jsxs)(_,{children:[n.jsx("div",{className:"label",children:"Realtor"}),n.jsx("div",{className:"value",children:e.realtorInfo})]}),e.lenderInfo&&(0,n.jsxs)(_,{children:[n.jsx("div",{className:"label",children:"Lender"}),n.jsx("div",{className:"value",children:e.lenderInfo})]}),e.closingDate&&(0,n.jsxs)(_,{children:[n.jsx("div",{className:"label",children:"Target Closing"}),(0,n.jsxs)("div",{className:"value",children:[n.jsx(u.Z,{size:14}),e.closingDate]})]})]})]}),(e.supportNeeded||e.itemsNeeded)&&(0,n.jsxs)(q,{children:[(0,n.jsxs)(O,{children:[n.jsx(w.Z,{size:16}),"Support Needs"]}),e.supportNeeded&&(0,n.jsxs)(V,{children:[(0,n.jsxs)("div",{className:"title",children:[n.jsx(E.Z,{size:14}),"Areas of Support"]}),n.jsx("div",{className:"content",children:e.supportNeeded})]}),e.itemsNeeded&&"None"!==e.itemsNeeded&&"No"!==e.itemsNeeded&&"N/A"!==e.itemsNeeded&&(0,n.jsxs)(V,{urgent:!0,children:[(0,n.jsxs)("div",{className:"title",children:[n.jsx(w.Z,{size:14}),"Immediate Needs"]}),n.jsx("div",{className:"content",children:e.itemsNeeded})]})]}),e.additionalNotes&&(0,n.jsxs)(q,{children:[(0,n.jsxs)(O,{children:[n.jsx(k.Z,{size:16}),"Sister's Story"]}),(0,n.jsxs)("div",{style:{padding:"1rem",background:"#F9FAFB",borderRadius:"0.5rem",fontStyle:"italic",color:"#374151",lineHeight:"1.5"},children:['"',e.additionalNotes,'"']})]}),(0,n.jsxs)("div",{style:{display:"grid",gridTemplateColumns:C?"repeat(2, 1fr)":"1fr 1fr",gap:"0.5rem",marginTop:"2rem"},children:[(0,n.jsxs)(K,{onClick:handleSchedule,children:[n.jsx(u.Z,{size:16}),"Schedule Meeting"]}),(0,n.jsxs)(G,{onClick:handleText,children:[n.jsx(h.Z,{size:16}),"Start Conversation"]})]})]}),C&&n.jsx(z.Z,{sisterId:e.id,initialNotes:e.notes||[],onNotesUpdate:(e,r)=>{s&&s(e,{notes:r})}})]})]})]}):null}i()}catch(e){i(e)}})}};