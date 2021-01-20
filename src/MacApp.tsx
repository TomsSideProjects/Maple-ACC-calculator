import {
  Breadcrumb,
  Col,
  Divider,
  Image,
  Input,
  Layout,
  Radio,
  Row,
  Select,
  Typography,
} from "antd";
import { Header, Content, Footer } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { doSomeMath, elementChecker, getMobs, Mob } from "./Util";

const { Title, Text } = Typography;
const { Option } = Select;

function onSearch(value: string) {}

export const MacApp = () => {
  document.title = "Maple-Accuracy-Calculator";
  const [world, setWorld] = useState<string>("all");
  const [monsterId, setMonsterId] = useState<string | undefined>();
  const [monster, setMonster] = useState<Mob | undefined>();
  const [mobList, setMobList] = useState<Mob[]>([]);
  const [sortType, setSortType] = useState("Alpha");
  const [monsterLevel, setMonsterLevel] = useState<number>();
  const [monsterAvoid, setMonsterAvoid] = useState<number>();
  const [charLevel, setCharLevel] = useState<number>();
  const [charAcc, setCharAcc] = useState<number>();
  const [charLuk, setCharLuk] = useState<number>();
  const [damageType, setDamageType] = useState("Physical");
  const [result, setResult] = useState(["0", "0", "0"]);

  useEffect(() => {
    const mobs: Mob[] = getMobs(world);
    setMobList(mobs);
    setMonsterId(undefined);
    setMonster(undefined);
  }, [world]);

  useEffect(() => {
    if (monsterId) {
      const mob = mobList.find((item) => item.id === monsterId);
      setMonster(mob);
      setMonsterLevel(mob ? mob.level : 0);
      setMonsterAvoid(mob ? mob.avoid : 0);
    }
  }, [monsterId]);

  useEffect(() => {
    setResult(
      doSomeMath(
        monsterLevel || 0,
        monsterAvoid || 0,
        charLevel || 0,
        charAcc || 0,
        charLuk || 0,
        damageType
      )
    );
  }, [monsterLevel, monsterAvoid, charAcc, charLevel, charLuk, damageType]);

  const sortedList =
    sortType === "Alpha"
      ? mobList
      : mobList.sort((a, b) => (a.level > b.level ? 1 : -1));

  const footerText =
    "Special thanks to Screaming Statue and Nekonecat for their accuracy calculators, ayumilove and 安心 for their formulas, Nani for being the best guild and Treehouse for being the best alliance <3";
  return (
    <Layout className="layout">
      <Header>
        <Title style={{ color: "white" }}>MAC</Title>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Row justify="center">
          <Title level={5}>Monster's Stats</Title>
        </Row>
        <Row>
          <Col span={6}>
            <Text>Level</Text>
          </Col>
          <Col span={6}>
            <Input
              value={monsterLevel}
              onChange={(e) => {
                setMonsterLevel(parseInt(e.target.value) || undefined);
              }}
            />
          </Col>
          <Col span={6}>
            <Text>Avoid</Text>
          </Col>
          <Col span={6}>
            <Input
              value={monsterAvoid}
              onChange={(e) =>
                setMonsterAvoid(parseInt(e.target.value) || undefined)
              }
            />
          </Col>
        </Row>
        <Row justify="center">
          <Title level={5}>Character's Stats</Title>
        </Row>
        <Row>
          <Col span={6}>
            <Text>Level</Text>
          </Col>
          <Col span={6}>
            <Input
              value={charLevel}
              onChange={(e) => {
                setCharLevel(parseInt(e.target.value) || undefined);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Radio.Group
            onChange={(e) => setDamageType(e.target.value)}
            value={damageType}
          >
            <Radio value={"Physical"}>Physical</Radio>
            <Radio value={"Magical"}>Magical</Radio>
          </Radio.Group>
        </Row>
        <Row>
          <Col span={6}>
            <Text>{damageType === "Physical" ? "ACC" : "INT"}</Text>
          </Col>
          <Col span={6}>
            <Input
              value={charAcc}
              onChange={(e) => {
                setCharAcc(parseInt(e.target.value) || undefined);
              }}
            />
          </Col>
          <Col span={6}>
            <Text>LUK</Text>
          </Col>
          <Col span={6}>
            <Input
              value={charLuk}
              onChange={(e) => {
                setCharLuk(parseInt(e.target.value) || undefined);
              }}
            />
          </Col>
        </Row>
        <Divider />
        <Row justify="center">
          <Col span={24}>Accuracy for 1%: {result[0]}</Col>
        </Row>
        <Row justify="center">
          <Col span={24}>Accuracy for 100%: {result[1]}</Col>
        </Row>
        <Row justify="center">
          <Col span={24}>Hit Rate: {result[2]}</Col>
        </Row>
        <Divider />
        <Row justify="center">
          <Title level={4}>Monster Selector</Title>
        </Row>
        <Row justify="center">
          <Col span={24}>
            <Row justify="center">
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a world"
                optionFilterProp="children"
                defaultValue="all"
                onChange={setWorld}
              >
                <Option value="all">All Worlds</Option>
                <Option value="Bosses">Bosses</Option>
                <Option value="Aqua">Aqua Road</Option>
                <Option value="China">China</Option>
                <Option value="LudusLake">Ludibrium/KFT/Omega</Option>
                <Option value="Masteria">Masteria</Option>
                <Option value="Minar">Minar</Option>
                <Option value="MuLung">Mu Lung</Option>
                <Option value="Neotokyo">Neotokyo</Option>
                <Option value="Nihal">Ariant/Magatia</Option>
                <Option value="OrbNath">Orbis/El Nath</Option>
                <Option value="PQ">PQ/Job</Option>
                <Option value="Singapore">Singapore</Option>
                <Option value="Taiwan">Taiwan</Option>
                <Option value="Thailand">Thailand</Option>
                <Option value="ToT">Temple of Time</Option>
                <Option value="VicIsland">Victoria Island</Option>
                <Option value="Zipangu">Zipangu</Option>
              </Select>
              <Text>Sort List By: </Text>
              <Radio.Group
                onChange={(e) => setSortType(e.target.value)}
                value={sortType}
              >
                <Radio value={"Level"}>Level</Radio>
                <Radio value={"Alpha"}>Alpha</Radio>
              </Radio.Group>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a mob"
                optionFilterProp="children"
                onChange={(value) => {
                  setMonsterId(value.toString());
                }}
                onSearch={onSearch}
                filterOption={(input, option) => {
                  if (option) {
                    return (
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    );
                  }
                  return false;
                }}
              >
                {sortedList &&
                  sortedList.map((mob) => {
                    return (
                      <Option value={mob.id} key={mob.id}>
                        {mob.name + "(" + mob.level + ")"}
                      </Option>
                    );
                  })}
              </Select>
            </Row>
          </Col>
        </Row>
        <Row justify="center">
          <Image
            width={200}
            height={200}
            src={
              "https://mrsoupman.github.io/Maple-ACC-calculator/images/" +
              monster?.id +
              ".png"
            }
          />
        </Row>
        <Row justify="center">
          <Text>Weak: </Text>
          {monster && elementChecker(monster.weak)}
        </Row>
        <Row justify="center">
          <Text>Strong: </Text>
          {monster && elementChecker(monster.strong)}
        </Row>
        <Row justify="center">
          <Text>Immune: </Text>
          {monster && elementChecker(monster.immune)}
        </Row>
        <Row justify="center">
          <Text>HP: </Text>
          {monster && monster.hp}
        </Row>
        <Row justify="center">
          <Text>EXP: </Text>
          {monster && monster.exp}
        </Row>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        <Text>{footerText}</Text>
      </Footer>
    </Layout>
  );
};
