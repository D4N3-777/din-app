import Head from "next/head";
import React from "react";

const Layout = (props: { children: React.ReactNode; }) => (
    <div>
        <Head>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto&display=swap" />
            <link rel="icon" href="/static/favicon.ico" type="image/x-icon"/>
        </Head>
        {props.children}
        <style jsx global>
            {`
                body {
                    overflow: hidden;
                    position: relative;
                    font-family: 'Roboto', sans-serif !important;
                }
            `}
        </style>
    </div>
);

export default Layout;
