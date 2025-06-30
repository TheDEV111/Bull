import { Container, ContainerFluid, Div, Image, Input } from "components/base";
import { OutlineBtn } from "components/elements/element.button";
import { Checkbox, FormInput } from "components/elements/element.form";
import { BottomLink, BottomTag, BullanaTitle, HeaderTitle, LeftBorderDiv, WelcomeTitle } from "components/elements/element.box";
import { IconGoogle, IconWallet } from "components/icons";
import { useState } from "react";

const LoginForm = () => {
  const [value, setValue] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <LeftBorderDiv
      flexDirection={"column"}
      height={"100vh"}
      alignItems={"center"}
      justifyContent={"start"}
      backgroundColor={"bg_2"}
    >
      <Container
        pt={["1.5em", "2.5em", "3.5em", "4.5em"]}
        px={["1.5em", "3em", "4.5em", "6em"]}
        flexDirection={"column"}>
        <Div>
          <Image src={require(`assets/image/vector.png`)} height={"2em"} />
          <BullanaTitle color={"color_1"} ml={"10px"}>BULLANA</BullanaTitle>
        </Div>
        <WelcomeTitle mt={"10px"}>Welcome to Bullana</WelcomeTitle>
        <HeaderTitle mt={"1em"}>Email/Phone number</HeaderTitle>
        <FormInput
          mt={"0.5em"}
          placeholder="Email/Phone (without country code)"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <Div mt={"2em"} justifyItems={"center"}>
          <Checkbox
            checked={checked}
            onChange={(event) => {
              setChecked(event.target.checked);
            }} />
          <HeaderTitle ml={"10px"}>By creating an account, I agree to Bullana Terms of Service and  Privacy Policy.</HeaderTitle>
        </Div>
        <OutlineBtn
          my={"2em"}
          width={"100%"}
        >
          NEXT
        </OutlineBtn>
        <Div alignItems={"center"} justifyContent={"center"}>
          <Div width={"100%"} height={"1px"} bg={"white"} />
          <HeaderTitle bg={"bg_2"} px={"0.5em"} position={"absolute"}>or</HeaderTitle>
        </Div>
        <OutlineBtn
          mt={"2em"}
          width={"100%"}
          justifyContent={"start"}
          bg={"bg_5"}
        >
          <IconGoogle size="1em" />
          <Div width={"100%"} justifyContent={"center"}>CONTINUE WITH GOOGLE</Div>
        </OutlineBtn>
        <OutlineBtn
          mt={"2em"}
          width={"100%"}
          justifyContent={"start"}
          bg={"bg_5"}
        >
          <IconWallet size="1em" />
          <Div width={"100%"} justifyContent={"center"}>CONTINUE WITH WALLETCONNECT</Div>
        </OutlineBtn>
      </Container>
      <BottomTag position={"fixed"} bottom={"2.5em"}>
          <BottomLink href={"#"}>Sign up as an entity&nbsp;</BottomLink>
          or
          <BottomLink href={"#"}> &nbsp;Login</BottomLink>
      </BottomTag>
    </LeftBorderDiv >
  );
};

export default LoginForm;
