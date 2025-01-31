import React from 'react';
import PropTypes from 'prop-types';
import {
    Heading,
    Box,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Image,
    Text,
    Paragraph,
    Avatar,
} from 'grommet';
import { Twitter, Language, Money } from 'grommet-icons';
import ReactTooltip from 'react-tooltip';
import { NETWORKS } from '../helpers';

const ProjectCard = ({ item }) => (
    <React.Fragment>
        <Card height={{ min: "small", max: "medium" }} width={{ min: "small", max: "medium" }} background="light-1" margin="medium" >
            <a href={item.websiteLink} target="_blank" rel="noopener noreferrer">
            <CardHeader pad="large" background={item.imageLink} style={{position:'relative'}} >
                {item.tokenStatus ? (
                    <React.Fragment>
                    <ReactTooltip id={item.name + item.tokenStatus} place="right" type="dark" effect="solid">
                        <Text>
                            { item.tokenStatus === "Has" ? ("Has a Token: $" + item.tokenTicker) : "Token Expected"}
                        </Text>
                    </ReactTooltip>
                    <Box style={{position:'absolute', top: '5px', right: '5px'}} data-tip data-for={item.name + item.tokenStatus}>
                        <Button icon={<Money color={item.tokenStatus === "Has" ? ("gold") : "grey"} />} hoverIndicator href={item.tokenLink ? (item.tokenLink) : null} target="_blank" />
                    </Box>

                    </React.Fragment>
                ) : null}
                {item.featured === 'featured' ? (
                    <Box height='xsmall' style={{position:'absolute', top: '0px', left: '5px'}} >
                        <Image src="/featured.svg" fit="contain" alt="React Logo" />
                    </Box>
                ) : null}
            </CardHeader>
            </a>
            <CardBody pad="medium" align="center">
                <a href={item.websiteLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <Heading margin="none" size="small" color="black">{item.name}</Heading>
                </a>
                <Text margin="small" size="medium">{item.category}</Text>
                <Paragraph margin="small" size="small">{item.description}</Paragraph>
            </CardBody>
            <CardFooter pad={{ horizontal: "small" }} background="light-2">
                <div style={{ zoom: "0.85" }}>
                    <Box direction="row" align="center" alignContent="center" justify="center">
                        <Button primary label={item.status} color={item.statusColor} data-tip data-for={item.name} />
                        <ReactTooltip id={item.name} place="right" type="dark" effect="solid">
                            <Text>
                                {item.tooltip}
                            </Text>
                        </ReactTooltip>
                        {item.networks && item.networks.length ? (
                            <Box margin={{left: '20px'}} direction="row" gap={'small'}>
                                {item.networks.map((network, idx) => (
                                    <Avatar src={NETWORKS[network]} size={'30px'} key={idx} />
                                ))}
                            </Box>
                        ) : null}
                    </Box>
                </div>
                <div>
                    <Button icon={<Twitter color="black" />} hoverIndicator href={item.twitterLink} target="_blank" />
                    <Button icon={<Language color="black" />} hoverIndicator href={item.websiteLink} target="_blank" />
                </div>
            </CardFooter>
        </Card>
    </React.Fragment>
);

ProjectCard.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string,
        imageLink: PropTypes.string,
        networks: PropTypes.array,
        category: PropTypes.string,
        description: PropTypes.string,
        statusColor: PropTypes.string,
        tooltip: PropTypes.string,
        twitterLink: PropTypes.string,
        websiteLink: PropTypes.string,
    }).isRequired,
};

export default ProjectCard;
