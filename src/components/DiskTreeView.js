/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { FaRegFolder, FaRegFolderOpen } from "react-icons/fa"; //FaCompactDisc
//import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";
import TreeView from "react-accessible-treeview";
import { AiOutlineLoading } from "react-icons/ai";
import "../assets/css/DiskTreeView.css";

const defautlFolder = [
	{ name: "", id: 0, children: [1], parent: null, },
	{ name: "/", id: 1, children: [], parent: 0, isBranch: true, },
	];

const DiskTreeView = ({ loadData, onTreeSelectItem, addFolder }) => {
	//const loadedAlertElement = useRef(null);
	const [data, setData] = useState(defautlFolder);
	const [nodesAlreadyLoaded, setNodesAlreadyLoaded] = useState([]);
	const [selectedItem, setSelectedItem] = useState(1);

	useEffect(() => {
		if(addFolder === null) return;
		const nodeHasAlreadyBeenLoaded = nodesAlreadyLoaded.find((e) => e.id === addFolder.id);
		if (!nodeHasAlreadyBeenLoaded) return;
		//console.log('[DiskTreeView] addFolder: ',addFolder);
		let children = data[addFolder.id].children;
		children.push(data.length);
		//console.log('children: ',data[addFolder.id].children);
		let value = updateTreeData([...data], addFolder.id, [
			{
				name: addFolder.newName,
				children: [],
				id: data.length,
				parent: addFolder.id,
				isBranch: true,
			}
		]);
		value[addFolder.id].children = children;
		//console.log('value: ',value);
		setData((value));
		//addFolder = null;
	}, [addFolder]);
	
	const updateTreeData = (list, id, children) => {
		const data = list.map((node) => {
			if (node.id === id) {
				node.children = children.map((el) => {
					return el.id;
				});
			}
			return node;
		});
		return data.concat(children);
	};

	const onLoadData = async ({ element }) => {
		return new Promise((resolve) => {
			if (element.children.length > 0) {
				resolve();
				return;
			}
			setTimeout(async() => {
				//console.log('[onLoadData] data: ',data);
				const elementsToAdd = await loadData(data.length, element.id, getPath(element.id));
				//console.log('elementsToAdd: ', elementsToAdd);
				//if(elementsToAdd === null) setData(data);
				if(elementsToAdd !== null) setData((value) => updateTreeData(value, element.id, elementsToAdd));
					/*
					updateTreeData(value, element.id, [
						{
							name: `AutoDir_${value.length}`,
							children: [],
							id: value.length,
							parent: element.id,
							isBranch: true,
						},
						{
							name: `AutoDir_${value.length + 1}`,
							children: [],
							id: value.length + 1,
							parent: element.id,
							isBranch: true,
						},
					])
				);
				*/
				resolve();
			}, 1000);
		});
	};

	const wrappedOnLoadData = async (props) => {
		const nodeHasNoChildData = props.element.children.length === 0;
		const nodeHasAlreadyBeenLoaded = nodesAlreadyLoaded.find(
			(e) => e.id === props.element.id
		);

		await onLoadData(props);

		if (nodeHasNoChildData && !nodeHasAlreadyBeenLoaded) {
			setNodesAlreadyLoaded([...nodesAlreadyLoaded, props.element]);
		}
		//console.log('nodesAlreadyLoaded: ',nodesAlreadyLoaded);
	};

	const OnSelectDir = async (id) => {
		setSelectedItem(id);
		//const path = getPath(id);
		//console.log('OnSelectDir path: ', path);
		onTreeSelectItem(id, getPath(id));
	};

	const getPath = (id) => {
		if(data[id].parent === 0) return "/";
		let path = "";
		while(data[id].parent !== 0) {
			path = "/" + data[id].name + path;
			id = data[id].parent;
		}
		return path;
	};

	return (
		<div>
			<div className="directory">
				<TreeView
					data={data}
					aria-label="directory tree"
					onLoadData={wrappedOnLoadData}
            		togglableSelect
					clickAction="EXCLUSIVE_SELECT"
					nodeRenderer={({
						element,
						isExpanded,
						getNodeProps,
						level,
					}) => {
						const branchNode = (isExpanded, element) => {
							return isExpanded && /*element.children.length === 0*/ !nodesAlreadyLoaded.find((e) => e.id === element.id) ? (
								<AiOutlineLoading aria-hidden={true} className="loading-icon" />
							) : (
								<>{isExpanded ? (<FaAngleDown className="diskTreeViewIcon" />) : (<FaAngleRight className="diskTreeViewIcon" />)}</>
							);
						};
						return (
						<div {...getNodeProps()} style={{ paddingLeft: 20 * (level - 1) }}>
							<div selected-item={selectedItem === element.id ? "true" : "false"} style={{ whiteSpace: "nowrap", width: "100%", cursor: "default", display: "flex", alignItems: "center" }}>
								{branchNode(isExpanded, element)}
								{isExpanded ?
									(<FaRegFolderOpen color="#FFDE00" className="diskTreeViewIcon" onClick={(e) => {OnSelectDir(element.id); e.preventDefault()}} />)
									:
									(<FaRegFolder color="#FFDE00" className="diskTreeViewIcon" onClick={(e) => {OnSelectDir(element.id); e.preventDefault()}} />)
								}
								<span style={{ width: "100%", userSelect: "none"}} onClick={(e) => {OnSelectDir(element.id); e.preventDefault()}}>{element.name}</span>
							</div>
						</div>
					)}
					}
				/>
			</div>
		</div>
	);
}

export default DiskTreeView;
