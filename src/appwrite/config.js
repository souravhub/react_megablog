import conf from '../conf/conf';
import { Client, ID, Databases, Storage, Query } from 'appwrite';

export class Service {
	client = new Client();
	databases;
	storage;

	constructor() {
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId);
		this.databases = new Databases(this.client);
		this.storage = new Storage(this.client);
	}

	async createPost({ title, slug, content, featuredImage, status, userId }) {
		try {
			return await this.databases.createDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				ID.unique(),
				{ title, slug, content, featuredImage, status, userId }
			);
		} catch (error) {
			console.log('Appwrite serice :: createPost :: error', error);
		}
	}

	async updatePost(
		documentId,
		{ title, slug, content, featuredImage, status }
	) {
		try {
			return await this.databases.updateDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				documentId,
				{ title, slug, content, featuredImage, status }
			);
		} catch (error) {
			console.log('Appwrite serice :: updatePost :: error', error);
		}
	}

	async deletePost(documentId) {
		try {
			return await this.databases.deleteDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				documentId
			);
		} catch (error) {
			console.log('Appwrite serice :: deletePost :: error', error);
		}
	}

	async getPost(documentId) {
		try {
			return await this.databases.getDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				documentId
			);
		} catch (error) {
			console.log('Appwrite serice :: getPost :: error', error);
		}
	}

	async getPosts(queries = [Query.equal('status', 'active')]) {
		console.log(queries, 'queries');
		try {
			return this.databases.listDocuments(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				queries
			);
		} catch (error) {
			console.log('Appwrite serice :: getPosts :: error', error);
			return false;
		}
	}

	// file upload service
	async uploadFile(file) {
		try {
			return await this.storage.createFile(
				conf.appwriteBucketId,
				ID.unique(),
				file
			);
		} catch (error) {
			console.log('Appwrite serice :: uploadFile :: error', error);
			return false;
		}
	}

	async deleteFile(fileId) {
		try {
			return await this.storage.deleteFile(conf.appwriteBucketId, fileId);
		} catch (error) {
			console.log('Appwrite serice :: deleteFile :: error', error);
			return false;
		}
	}

	getFilePreview(fileId) {
		return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
	}
}

const service = new Service();

export default service;
