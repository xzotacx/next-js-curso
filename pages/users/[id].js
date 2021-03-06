import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Layout from "../../components/Layaout";
import NavBar from "../../components/NavBar";
import Title from "../../components/Title";

function User(props) {
  const { user } = props;
  const router = useRouter();
  if (router.isFallback) {
    return <div>Cargando</div>;
  }
  const { id } = router.query;

  return (
    <Layout>
      <Head>
        <title>User #{id}</title>
        <meta name="description" content="En este curso de webtutoriales aprenderas next js"/>
      </Head>
      <div>
        <Title>User ID {user.id}</Title>
        <div className="card">
          <h3>User</h3>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Website: {user.website}</p>
        </div>
      </div>
      <style jsx>
        {`
          .card {
            margin: 1rem;
            flex-basis: 45%;
            padding: 1.5rem;
            text-align: left;
            color: inherit;
            text-decoration: none;
            border: 1px solid #eaeaea;
            border-radius: 10px;
            transition: color 0.15s ease, border-color 0.15s ease;
          }

          .card:hover,
          .card:focus,
          .card:active {
            color: #0070f3;
            border-color: #0070f3;
          }

          .card h3 {
            margin: 0 0 1rem 0;
            font-size: 1.5rem;
          }

          .card p {
            margin: 0;
            font-size: 1.25rem;
            line-height: 1.5;
          }
        `}
      </style>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const users = await res.json();

  const paths = users.map((user) => ({ params: { id: `${user.id}` } }));
  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const user = await res.json();
  return {
    props: {
      user,
    },
  };
}

export default User;
