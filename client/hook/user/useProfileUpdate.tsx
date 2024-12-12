import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ProfileUpdateData {
	name?: string;
	biography?: string;
	avatar?: File;
	banner?: File;
}

const useProfileUpdate = () => {
	const queryClient = useQueryClient();

	const updateProfileMutation = useMutation({
		mutationFn: async (data: ProfileUpdateData) => {
			const formData = new FormData();
			
			// Handle text data
			const updateData: any = {};
			if (data.name) updateData.name = data.name;
			if (data.biography) updateData.biography = data.biography;
			formData.append('updateUserDto', JSON.stringify(updateData));

			// Handle files if present
			if (data.avatar) {
				formData.append('file', data.avatar);
				const response = await fetch('http://localhost:8080/users?fileType=avatar', {
					method: 'PATCH',
					credentials: 'include',
					body: formData,
				});
				if (!response.ok) {
					const error = await response.json();
					throw new Error(error.message);
				}
			}

			if (data.banner) {
				const bannerFormData = new FormData();
				bannerFormData.append('file', data.banner);
				bannerFormData.append('updateUserDto', JSON.stringify(updateData));
				const response = await fetch('http://localhost:8080/users?fileType=banner', {
					method: 'PATCH',
					credentials: 'include',
					body: bannerFormData,
				});
				if (!response.ok) {
					const error = await response.json();
					throw new Error(error.message);
				}
			}

			// If there's only text data or no files were uploaded
			if (!data.avatar && !data.banner) {
				const response = await fetch('http://localhost:8080/users', {
					method: 'PATCH',
					credentials: 'include',
					body: formData,
				});
				if (!response.ok) {
					const error = await response.json();
					throw new Error(error.message);
				}
				return response.json();
			}

			return { message: 'Profile updated successfully' };
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user'] });
		},
	});

	return {
		updateProfile: updateProfileMutation.mutate,
		isUpdating: updateProfileMutation.isPending,
	};
};

export default useProfileUpdate;