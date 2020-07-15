export const formatDate = (t)=>{
	let dd = new Date(t);
	let y = dd.getFullYear();
	let m = (dd.getMonth()+1).toString().padStart(2,"0");
	let d = dd.getDate().toString().padStart(2,"0");
	return `${y}.${m}.${d}`;
}