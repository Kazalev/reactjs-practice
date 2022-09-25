import SocialIcons from './SocialIcons'
import { Container } from './styles/Container.styled'
import { Flex } from './styles/Flex.styled'
import { StyledFooter } from './styles/Footer.styled'

export default function Footer() {
    return (
        <StyledFooter>
            <Container>
                <img src='./images/logo_white.svg' alt='' />

                <Flex>
                    <ul>
                        <li>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Laboriosam sed fugiat a ratione quis provident fugit tempora omnis vel modi consequuntur eligendi quasi,
                            reprehenderit delectus cum iusto mollitia optio illum?
                        </li>
                        <li>+1-543-123-4567</li>
                        <li>example@huddle.com</li>
                    </ul>
                    <ul>
                        <li>About Us</li>
                        <li>What We Do</li>
                        <li>FAQ</li>
                    </ul>

                    <ul>
                        <li>Career</li>
                        <li>Blog</li>
                        <li>Contact Us</li>
                    </ul>

                    <SocialIcons />
                </Flex>

                <p>&copy; {new Date().getFullYear()} Huddle. All rights reserved</p>
            </Container>
        </StyledFooter>
    )
}