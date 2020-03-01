import { NextPage } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import React from "react";
import { ForgotPasswordModal, LoginForm } from "../../src/Components/Login";
import FullScreenCarousel from "../../src/Components/Shared/FullScreenCarousel";
import { withAuthentication } from "../../src/Domain/Authentication";
import { BackgroundImage } from "../../src/Domain/Models/Media";
import Layout from "../../src/Layouts/Layout";
import { AppContext } from "../../src/Store/AppContext";
import { getBackgrounds } from "../../src/Store/Modules/Main";

interface IProps {
    username: string;
    rememberUsername: string;
    backgrounds: BackgroundImage[];
}

const LoginPage: NextPage<IProps> = (props: IProps): JSX.Element => {
    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
            <FullScreenCarousel
                backgrounds={props.backgrounds}
            />
            <LoginForm
                username={props.username}
                rememberUsername={props.rememberUsername === "true"}
            />
            <ForgotPasswordModal/>
        </Layout>
    );
};

LoginPage.getInitialProps = async (context: AppContext): Promise<IProps> => {
    const {rememberUsername, username} = parseCookies(context);
    const backgrounds = await getBackgrounds(context);

    return {username, rememberUsername, backgrounds};
};

export default withAuthentication(LoginPage);

