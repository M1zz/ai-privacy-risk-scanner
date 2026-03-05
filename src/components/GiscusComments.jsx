import Giscus from '@giscus/react';

export default function GiscusComments({ term, dark }) {
  return (
    <div style={{ marginTop: 4 }}>
      <Giscus
        repo="M1zz/ai-privacy-risk-scanner"
        repoId="R_kgDORc6ktA"
        category="General"
        categoryId="DIC_kwDORc6ktM4C3vhc"
        mapping="specific"
        term={`case/${term}`}
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={dark ? "dark_dimmed" : "light"}
        lang="ko"
        loading="lazy"
      />
    </div>
  );
}
