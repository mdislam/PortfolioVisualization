/**
 * Created by mis on 3/1/2016.
 */
// create an array with nodes
var nodes = new vis.DataSet([
    {id: 1, label: 'Mesbahul\nIslam', shape: 'circularImage', image: 'images/profile1.jpg', size: 50,
        font: {
            color: '#f0f0f0',
            size: 11, // px
            face: 'verdana'
        }},
    {id: 2, label: 'Academic\nBackground', cid:1,
        font: {
            color: '#ff00ff',
            size: 14, // px
            face: 'verdana'
        }
    },
    {id: 3, label: 'Professional\nExperience', cid:2},
    {id: 4, label: 'Skills', cid:3},
    {id: 5, label: 'Android', cid:3},
    {id: 6, label: 'Java', cid:3},
    {id: 7, label: 'NodeJs', cid:3},
    {id: 8, label: 'FGI', cid:2},
    {id: 9, label: 'NSN', cid:2},
    {id: 10, label: 'BUET', cid:1},
    {id: 11, label: 'UH', cid:1}
]);

// create an array with edges
var edges = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3},
    {from: 1, to: 4},
    {from: 2, to: 10},
    {from: 2, to: 11},
    {from: 3, to: 8},
    {from: 3, to: 9},
    {from: 4, to: 5},
    {from: 4, to: 6},
    {from: 4, to: 7}
]);

// create a network
var container = document.getElementById('mynetwork');

// provide the data in the vis format
var data = {
    nodes: nodes,
    edges: edges
};
var options = {};

// initialize your network!
var network = new vis.Network(container, data, options);

network.on("selectNode", function(params) {
    if (params.nodes.length == 1) {
        if (network.isCluster(params.nodes[0]) == true) {
            network.openCluster(params.nodes[0]);
        }
        else {
            if(params.nodes[0].id == 2) {
                network.cluster(clusterOptionsByAcademic);
            }
        }
    }
});



// network.setData(data);

// cluster by Academic
var clusterOptionsByAcademic = {
    joinCondition:function(childOptions) {
        return childOptions.cid == 1;
    },
    clusterNodeProperties: {id:'cidCluster1', label: 'Academic', borderWidth:3, shape:'circle'}
};
network.cluster(clusterOptionsByAcademic);

// cluster by Professions
var clusterOptionsByProfessions = {
    joinCondition:function(childOptions) {
        return childOptions.cid == 2;
    },
    clusterNodeProperties: {id:'cidCluster2', label: 'Profession', borderWidth:3, shape:'circle'}
};
network.cluster(clusterOptionsByProfessions);

// cluster by skills
var clusterOptionsBySkills = {
    joinCondition:function(childOptions) {
        return childOptions.cid == 3;
    },
    clusterNodeProperties: {id:'cidCluster3', label: 'Skills', borderWidth:3, shape:'circle'}
};
network.cluster(clusterOptionsBySkills);


var mainClusterOptions = {
    clusterNodeProperties: {
        id: 'masterCluster',
        label: 'Please click to expand',
        font: {
            color: '#ff00ff',
            size: 14, // px
            face: 'verdana'
        },
        title: 'Please click to expand',
        shape: 'circularImage',
        image: 'images/profile1.jpg',
        size: 100
    }
}
network.clusterByConnection(1, mainClusterOptions);