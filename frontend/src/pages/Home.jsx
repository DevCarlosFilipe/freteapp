import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import Hero from '../components/layout/hero/Hero'
import ColItem from '../components/layout/section/ColItem'
import Section from '../components/layout/section/Section'
import Testimonial from '../components/layout/section/Testimonial'

function Home () {
    return (
        <>
            <Header />
            <Hero />
            <Section background="white">
                <ColItem icon="shield-fill-check" title="Segurança" description="Sua encomenda é nossa prioridade" />
                <ColItem icon="lightning-charge-fill" title="Rapidez" description="Entregas no mesmo dia quando possível" />
                <ColItem icon="geo-alt-fill" title="Cidades Atendidas" description="Diversas cidades em sergipe e região" />
                <ColItem icon="star-fill" title="Qualidade" description="Serviços de alta qualidade para você" />
            </Section>
            <Section background="black" title="Como funciona" arrow={true}>
                <ColItem icon="1-circle-fill" title="Solicite a coleta" description="Preencha o formulário ou fale conosco." />
                <ColItem icon="2-circle-fill" title="Nós buscamos" description="Coletamos no endereço informado." />
                <ColItem icon="3-circle-fill" title="Entregamos" description="Você acompanha cada etapa da entrega." />
            </Section>
            <Section background="gray" title="O que nossos clientes dizem">
                <Testimonial
                    rating={5}
                    quote="Excelente serviço! Entregaram no prazo e minha encomenda chegou perfeita."
                    name="Carlos Almeida"
                    location="Aracaju - SE"
                />
                
                <Testimonial
                    rating={5}
                    quote="Muito rápido e seguro. Acompanhei tudo pelo site, muito bom!"
                    name="Juliana Santos"
                    location="Nossa Sra do Socorro - SE"
                />
                
                <Testimonial
                    rating={5}
                    quote="Já uso sempre. Confiança e responsabilidade definem essa empresa. Recomendo!"
                    name="Marcos Lima"
                    location="Estância - SE"
                />
            </Section>
            <Footer />
        </>
    )
}

export default Home