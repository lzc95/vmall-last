export const REQUEST_URL='http://www.luozc.club:8088';

export function toFixed_2(arg){
    var num=new Number(arg);
    var n=num.toFixed(2);
    return n;
}

export function regDate(arg){
	var time=parseInt(arg);
	var date=new Date(time);
	var d=date.toLocaleString();
	return d;
}
