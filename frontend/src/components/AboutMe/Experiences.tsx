import "./Experiences.scss";
import { motion } from "framer-motion";
import Badge from "../shared/Badge";
import { useState } from "react";
import Button from "../shared/Button";

interface ExperiencesProps {
  next: (nextValue: number) => void;
  auto?: boolean;
  currentStep: number;
}

function Experiences({ next, auto }: ExperiencesProps) {
  const goNext = async () => {
    next(5);
  };

  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <motion.div
        className="experiences"
        animate={{
          opacity: [0, 0.2, 1],
          transition: { delay: 0.4 },
        }}
        transition={{
          ease: "easeOut",
          duration: 1,
          when: "beforeChildren",
        }}
      >
        <motion.div className="title-text ">EXPERIENCES</motion.div>
        <motion.div className="text ">
          <motion.div
            animate={{ y: [50, 0], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 1, delay: 0.7 }}
          >
            <Badge>03/12/19 - Mobile and Web Developer in EPE</Badge>
          </motion.div>

          <motion.div
            animate={{ y: [50, 0], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 1, delay: 1 }}
            style={{ fontSize: "0.9em" }}
          >
            Implementación de proyectos internos de la empresa con NodeJS
            (Typescript), aplicaciones móviles en IONIC. Implementacion y
            mantenimiento de sistemas angular, react.js y vue.js. Ademas
            configuracion de CI/CD para despliegue y automaticacion de procesos.
          </motion.div>
        </motion.div>

        <motion.div className="text" style={{ marginTop: 20 }}>
          <motion.div
            animate={{ y: [50, 0], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 1, delay: 1.3 }}
          >
            <Badge>
              15/07/19 - 03/12/19 - Desarrollador y Analista en La caja de
              ingenieria
            </Badge>
          </motion.div>

          <motion.div
            animate={{ y: [50, 0], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 1, delay: 1.6 }}
            style={{ fontSize: "0.9em" }}
          >
            Implementación de proyectos internos de la empresa en C# MVC .NET y
            javascript. Implementacion de StoreProcedures
          </motion.div>
        </motion.div>

        <motion.div className="text" style={{ marginTop: 20 }}>
          <motion.div
            animate={{ y: [50, 0], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 1, delay: 1.9 }}
          >
            <Badge>
              22/12/16 - 10/07/19 - Desarrollador y Analista en Matriz S.A.
            </Badge>
          </motion.div>

          <motion.div
            animate={{ y: [50, 0], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 1, delay: 2.2 }}
            style={{ fontSize: "0.9em" }}
          >
            Implementación y gestión de proyecto de plataforma de trading
            MATRIZ. Desarrollo frontend con REACT.js , Desarrollo backend con
            GOLANG y ELIXIR. Herramientas de proyecto GITLAB y docker.
          </motion.div>
        </motion.div>

        {/* {!showMore && (
          <motion.div
            animate={{ y: [50, 0], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 1, delay: 2.4 }}
            style={{
              width: "168px",
              margin: "23px auto auto auto",
              cursor: "pointer",
            }}
            onClick={() => setShowMore(true)}
          >
            <Button onClick={() => setShowMore(true)}>Show More</Button>
          </motion.div>
        )} */}

        <motion.div className="text" style={{ marginTop: 20 }}>
          <motion.div
            animate={{ y: [50, 0], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 1, delay: 2.6 }}
          >
            <Badge>15/07/14 - 15/12/16 - Others Jobs</Badge>
          </motion.div>

          <motion.div
            animate={{ y: [50, 0], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 1, delay: 2.8 }}
            style={{ fontSize: "0.9em" }}
          >
            <div>
              * Red mutual - Desarrollo en VB.Net y javascript de herramientas
              internas del sector
            </div>
            <div>
              * Pasantía Musimundo - Desarrollo de fix en 4GL INFORMIX para
              aplicaciones existentes en la empresa.
            </div>
            <div>
              * Pasantía en Acronex - Desarrollo de “router” de paquetes para
              hardware desarrollado en la empresa, implementado en PYTHON sobre
              una placa raspberry PI
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="text" style={{ marginTop: 20 }}>
          <motion.div
            animate={{ y: [50, 0], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 1, delay: 3 }}
          >
            <Badge>Other knowledge</Badge>
          </motion.div>

          <motion.div
            animate={{ y: [50, 0], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 1, delay: 3.2 }}
            style={{ fontSize: "0.9em" }}
          >
            <div>
              * <strong>Databases</strong> - Postgres, MySQL, Oracle, SQL Server
              (store procedures)
            </div>
            <div>
              * <strong>Testing tools</strong> - Jest, supertest, Elixir
              Phoenix, Jasmin, Go Testify.
            </div>
            <div>
              * <strong>Virtualización and Containers</strong> - Docker and
              Vagrant
            </div>
            <div>
              * <strong>CI/CD</strong> - Git and Gitlab Pipelines
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default Experiences;
