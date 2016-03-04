/**
 * Created by mis on 3/1/2016.
 */
// create an array with nodes
var nodes = new vis.DataSet([
    {id: 1, label: 'Mesbahul\nIslam', shape: 'circularImage', image: 'images/pro_pic.jpg', size: 50,
        font: {
            color: '#C54C4C',
            size: 14, // px
            face: 'Ubuntu'
        }},
    {id: 2, label: 'Academic\nBackground', cid:1,
        font: {
            color: '#ff00ff',
            size: 14, // px
            face: 'verdana'
        }, group: 3
    },
    {id: 3, label: 'Professional\nExperience', group: 2, cid:2},
    {id: 4, label: 'Skills', group: 1, cid:3},
    {id: 5, label: 'Android', group: 1, cid:3, shape: 'image', image: 'images/android.png', size: 20},
    {id: 6, label: 'Java', group: 1, cid:3, shape: 'image', image: 'images/java.png', size: 20},
    {id: 7, label: 'NodeJs', group: 1, cid:3, shape: 'image', image: 'images/nodejs.png', size: 20},
    {id: 8, label: 'FGI', group: 2, cid:2},
    {id: 9, label: 'NSN', group: 2, cid:2},
    {id: 10, label: 'Bangladesh University\nof\nEngineering & Technology', group: 3, cid:1, shape: 'image', image: 'images/buet.png', size: 20},
    {id: 11, label: 'University of Helsinki', group: 3, cid:1, shape: 'image', image: 'images/hy.png', size: 20}
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
//var options = {};

var options = {
    nodes: {
        shape: 'circle',
        size: 35,
        font: {
            color: '#C54C4C',
            size: 14, // px
            face: 'Ubuntu'
        },
        borderWidth: 2,
        shadow:true
    },
    edges: {
        width: 2,
        shadow:true
    }
};

// initialize your network!
var network = new vis.Network(container, data, options);

network.on("selectNode", function(params) {
    console.log('Select Event:', params.nodes);
    if (params.nodes.length == 1) {
        if (network.isCluster(params.nodes[0]) == true) {
            network.openCluster(params.nodes[0]);
        }
        else {
            if(params.nodes[0] == 2) {
                network.cluster(clusterOptionsByAcademic);
            }
            else if(params.nodes[0] == 3) {
                network.cluster(clusterOptionsByProfessions);
            }
            else if(params.nodes[0] == 4) {
                network.cluster(clusterOptionsBySkills);
            }
        }
    }
});

network.on("click", function (params) {
    console.log('Click Event:', params.nodes[0]);
    if (params.nodes.length == 1) {
        if (network.isCluster(params.nodes[0]) == false) {
            focusRandom(params.nodes[0]);
            if(params.nodes[0] == 2) {
                $("#education").removeClass('hidden');
                $("#skill").addClass('hidden');
                $("#professional").addClass('hidden');
            }
            else if(params.nodes[0] == 3) {
                $("#education").addClass('hidden');
                $("#skill").addClass('hidden');
                $("#professional").removeClass('hidden');
            }
            else if(params.nodes[0] == 4) {
                $("#education").addClass('hidden');
                $("#skill").removeClass('hidden');
                $("#professional").addClass('hidden');
            }
        }
    }
});

function focusRandom(selectedNode) {
    var nodeId = selectedNode;
    var options = {
        scale: 3.0,
        offset: {x:0,y:0},
        animation: {
            duration: 1000,
            easingFunction: 'easeInOutQuad'
        }
    };
    network.focus(nodeId, options);
}

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

// main cluster
var mainClusterOptions = {
    clusterNodeProperties: {
        id: 'masterCluster',
        label: 'Please click to expand',
        font: {
            color: '#C54C4C',
            size: 14, // px
            face: 'Ubuntu'
        },
        title: 'Please click to expand',
        shape: 'circularImage',
        image: 'images/pro_pic.jpg',
        size: 100
    }
};
network.clusterByConnection(1, mainClusterOptions);