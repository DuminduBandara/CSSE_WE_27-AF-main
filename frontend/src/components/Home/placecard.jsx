import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Kandy from "../../images/maligawa.jpeg";
import Kurunegala from "../../images/kurunegala.jpg";
import Galle from "../../images/galle2.jpg";
import Anuradapura from "../../images/anuradapura.jpg";
import Polonnaruwa from "../../images/polonnaruwa.jpeg";
import Nuwaraeliy from "../../images/nuwaraeliya.jpeg";
import Hambnthota from "../../images/hmbnthota.jpeg";
import Jaffna from "../../images/jaffna.jpeg";

export default function PlaceCard() {
  return (
    <div style={{marginLeft: "5rem"}}>
        <div class="row">
          <div class="column">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={Kandy} />
            <Card.Body>
              <Card.Title>Kandy</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Dalada Maligawa
              </Card.Subtitle>
              <Card.Text>
              Kandy is a large city in central Sri Lanka. It's set on a plateau 
              surrounded by mountains, which are home to tea plantations and biodiverse rainforest.

              </Card.Text>
              <Button variant="primary">View</Button>
            </Card.Body>
          </Card>
          </div>

          <div class="column">
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={Kurunegala} />
              <Card.Body>
                <Card.Title>Kurunegala</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Athugala
                </Card.Subtitle>
                <Card.Text>
                Kurunegala is a major city in Sri Lanka. It is the capital city of the North Western Province and the Kurunegala District. 
                Kurunegala was an ancient royal capital for 50 years.
                </Card.Text>
                <Button variant="primary">View</Button>
              </Card.Body>
            </Card>
          </div>

          <div class="column">
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={Galle} />
              <Card.Body>
                <Card.Title>Galle</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  galle fort
                </Card.Subtitle>
                <Card.Text>
                Galle is a city on the southwest coast of Sri Lanka. It known for Galle Fort, 
                the fortified old city founded by Portuguese colonists in the 16th century. 
                Stone sea walls.
                </Card.Text>
                <Button variant="primary">View</Button>
              </Card.Body>
            </Card>
          </div>
          <div class="column">
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={Anuradapura} />
              <Card.Body>
                <Card.Title>Anuradapura</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                 Ruwanweli maha seya
                </Card.Subtitle>
                <Card.Text>
                Anuradhapura is a major city located in north central plain of Sri Lanka. 
                It is the capital city of North Central Province, Sri Lanka and the capital of Anuradhapura District.
                </Card.Text>
                <Button variant="primary">View</Button>
              </Card.Body>
            </Card>
          </div>
        </div>
        <div class="row">
          <div class="column">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={Polonnaruwa} />
            <Card.Body>
              <Card.Title>Polonnaruwa</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
              Polonnaruwa
              </Card.Subtitle>
              <Card.Text>
              Poḷonnaruwa, also referred as Pulathisipura and Vijayarajapura in ancient times, 
              is the main town of Polonnaruwa District in North Central Province, Sri Lanka. 
              The modern town of Polonnaruwa is also known as New Town.
              </Card.Text>
              <Button variant="primary">View</Button>
            </Card.Body>
          </Card>
          </div>

          <div class="column">
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={Nuwaraeliy} />
              <Card.Body>
                <Card.Title>Nuwaraeliya</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Water fall
                </Card.Subtitle>
                <Card.Text>
                Nuwara Eliya is a city in the tea country hills of central Sri Lanka. 
                The naturally landscaped Hakgala Botanical Gardens displays roses and tree ferns, and shelters monkeys and blue magpies.
                </Card.Text>
                <Button variant="primary">View</Button>
              </Card.Body>
            </Card>
          </div>

          <div class="column">
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={Hambnthota} />
              <Card.Body>
                <Card.Title>Hambanthota</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Port
                </Card.Subtitle>
                <Card.Text>
                Hambantota is the main town in Hambantota District, Southern Province, 
                Sri LankaThe prominent Malays most part of the population is to be partly descended 
                from seafarers from the Malay Archipelago who travelled through the Magampura port
                </Card.Text>
                <Button variant="primary">View</Button>
              </Card.Body>
            </Card>
          </div>
          <div class="column">
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={Jaffna} />
              <Card.Body>
                <Card.Title>Jaffna</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Kovil
                </Card.Subtitle>
                <Card.Text>
                Jaffna is a city on the northern tip of Sri Lanka. Nallur Kandaswamy is a huge Hindu temple with golden arches and an ornate gopuram tower. 
                By the coast, star-shaped Jaffna Fort was built by the Portuguese in the 17th century and later occupied by the Dutch and British.
                </Card.Text>
                <Button variant="primary">View</Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      
  );
}
