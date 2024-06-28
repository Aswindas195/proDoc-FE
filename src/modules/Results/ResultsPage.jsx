import { Box, Button, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const ResultsPage = () => {
  const files = useSelector((state) => state.result);
  console.log(files);
  return (
    <Box sx={{ padding: "70px" }}>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{ display: "flex", flexDirection: "column", marginRight: "20px" }}
        >
          {files.map(files=>)}
        </Box>
        <Paper
          elevation={3}
          sx={{
            padding: "20px",
            width: "100%",
            height: "calc(100vh - 280px)",
            overflowY: "auto",
            wordBreak: "break-word",
            borderRadius: "15px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
            <Button variant="outlined" sx={{ borderRadius: "10px" }}>
              Regenerate
            </Button>
          </Box>
          <Box sx={{ overflowY: "auto", height: "calc(100vh - 360px)", px: 2 }}>
            <Typography>
              content Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Eaque porro, minima maxime inventore saepe veritatis ratione
              expedita optio, laborum quisquam error incidunt rem facere. Iste
              dolor laudantium optio veniam iure. Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Repellat, autem corporis impedit
              delectus beatae vero, inventore excepturi necessitatibus alias
              exercitationem magni itaque maiores enim deleniti totam
              laudantium, vel hic perferendis fugiat tempore! Laudantium, quis,
              fugit labore suscipit corrupti ut repellendus ipsa veniam culpa
              placeat dicta sint quasi modi aspernatur eius itaque voluptatum
              alias quos numquam perferendis voluptate! Fuga deleniti ipsa
              repellat nemo asperiores qui necessitatibus, ipsum consequatur
              magnam consequuntur harum accusamus quidem quod sequi, minus
              cumque. Iusto minima et soluta voluptatum impedit nulla, adipisci
              quo atque facere doloremque omnis aperiam debitis molestias rerum
              obcaecati nesciunt dignissimos hic cumque magni, architecto
              suscipit, eos necessitatibus deserunt? Harum tenetur praesentium
              amet ex quisquam molestias ipsam assumenda, voluptatem ea nihil
              in! Porro quam, possimus eum alias qui, eveniet inventore
              obcaecati provident molestias sunt totam, consequatur soluta?
              Tenetur eos voluptatem laudantium voluptatum sunt ratione sapiente
              nam, accusamus optio enim blanditiis veritatis sint pariatur a,
              iure officia aspernatur distinctio dolorem ducimus facilis placeat
              est repellendus quae. Vitae, libero? Qui officia maxime adipisci
              deserunt laborum modi neque explicabo dignissimos sint cumque,
              facere, dolores laudantium esse delectus vitae nulla enim beatae
              odio non, laboriosam iste labore libero vero aperiam. Ullam
              repellat maiores tenetur quo pariatur soluta commodi repellendus
              maxime voluptates quod voluptas facere corporis officia velit
              ipsam culpa nam doloribus libero dolorem exercitationem impedit,
              deserunt animi. Sit, nobis. Voluptatem nisi quae enim doloremque
              temporibus facere est earum vel odio accusamus, nostrum illum
              perspiciatis? Quam doloribus libero omnis architecto delectus
              expedita eligendi non voluptate beatae sapiente ipsam molestiae,
              tempora atque! Error necessitatibus quasi commodi quod. At natus
              eos aliquam voluptates unde. Alias pariatur ea in et laborum
              dolorum animi quisquam? Veniam, totam ad deleniti cumque corrupti
              voluptas blanditiis nulla ea consectetur optio quibusdam sequi,
              nostrum libero aliquid facere quisquam numquam iste tenetur!
              Dolore ab dignissimos voluptas libero, doloribus et nobis nostrum
              officiis voluptatibus perspiciatis excepturi natus ipsa
              consectetur earum molestiae asperiores deleniti illum possimus
              iusto error sapiente incidunt? Ratione et accusamus natus!
              Necessitatibus similique aut architecto ut officia accusantium at,
              qui est illum beatae cupiditate doloremque. Iusto, mollitia
              dolorem aspernatur corrupti minus, ut molestiae natus officia
              necessitatibus iste animi? Consectetur, voluptates alias? Cumque
              voluptatum hic tempore reprehenderit eligendi iusto numquam ut
              praesentium distinctio placeat itaque non aperiam aut quis,
              assumenda, soluta ad quod voluptas, laborum unde. Omnis sunt
              architecto tempore provident odio et modi perspiciatis, alias
              temporibus earum unde voluptates expedita nemo id a praesentium
              nesciunt neque inventore. Repellendus, possimus fuga molestias,
              maxime quia rerum ipsam cupiditate ea, sint a dolor? Perferendis
              soluta consectetur maxime nostrum? Sapiente unde inventore impedit
              maiores assumenda harum! Quae voluptate blanditiis, animi, vel
              expedita cupiditate nisi fugiat aut voluptas quam non laboriosam
              officiis voluptatum error. Optio aperiam, delectus cumque odio
              quod unde impedit explicabo vel, quibusdam commodi incidunt
              deserunt. Aliquid aliquam sint numquam, rem tempora molestiae odio
              minima eligendi explicabo, ipsam deleniti corrupti veniam
              doloribus eius pariatur esse sunt reprehenderit qui accusamus! Sit
              ex, temporibus repellat repellendus qui doloribus ullam deleniti
              eaque! Accusamus voluptate consequuntur quod illo laboriosam
              aliquid cupiditate ea quidem nulla et.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default ResultsPage;
