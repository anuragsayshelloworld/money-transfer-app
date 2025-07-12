export default function useLocalstorage(key, action = 'get', data = false, string = false){
 try {
   if(action === 'get' && string){
      return JSON.parse(localStorage.getItem(key)) || '';
   }
   else if(action === 'get'){
      return JSON.parse(localStorage.getItem(key)) || [];
   }
   else if(action === 'set'){
      localStorage.setItem(key, JSON.stringify(data));
   }
 } catch (error) {
   console.error('LocalStorage error:', error);
   return action === 'get' ? (string ? '' : []) : undefined;
 }
}