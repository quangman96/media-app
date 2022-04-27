import Login from '../components/login'

export default function Home() {
  return (
    <Login user />
  )
}

// export async function getStaticProps() {
//   const res = await firebase.getAll("user_profile");
//   return {
//     props: {
//       users: res,
//     },
//   };
// }

