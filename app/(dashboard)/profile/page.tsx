const getUserInfo = async() => {
  const data = await fetch('https://api.example.com/sales')
    .then(res => res.json());
  return data; 
};

export default function ProfileSection() {
  const userInfo = getUserInfo();
  return (
    <>
      <h1>HELLO DASHBOARD PROFILE!</h1>
    </>
  );
}
