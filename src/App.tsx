import styled from 'styled-components';
import { VisitCounterForm } from './components/molecules';

const Wrapper = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Heading = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
`;

export const Description = styled.p`
  margin-bottom: 20px;
`;

const CodeBlock = styled.code`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  background: #222;
  color: #fff;
  border-radius: 4px;
  padding: 10px;
  align-items: flex-start;
`;

export const App: React.FC = () => {
  return (
    <Wrapper>
      <Heading>Hey there!</Heading>
      <Description>
        This is a very simple application that lets you count the total and
        unique webpage visits based on the log file fed into the form below. The
        form expects the following format with visitor's id being an IP-like
        identifier containing up to 12 dot-delimited digits (999.999.999.999).
        <CodeBlock>
          <span>/[page] [visitor's id]</span>
          <span>/[page] [visitor's id]</span>
          <span>/[page] [visitor's id]</span>
        </CodeBlock>
        An example valid input could look like this:
        <CodeBlock>
          <span>/help_page/1 126.318.035.038</span>
          <span>/contact 184.123.665.067</span>
          <span>/home 184.123.665.067</span>
          <span>/about/2 444.701.448.104</span>
          <span>/help_page/1 929.398.951.889</span>
        </CodeBlock>
      </Description>
      <Description></Description>
      <VisitCounterForm />
    </Wrapper>
  );
};
