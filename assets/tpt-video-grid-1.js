function tptPauseAllVideo() {
	document.querySelectorAll('video').forEach((video) => video.pause());
}

function tptMutedAllVideo() {
	document.querySelectorAll('video').forEach((video) => (video.muted = true));
}

if (!customElements.get('tpt-video-item')) {
	customElements.define(
		'tpt-video-item',
		class TptVideoItem extends HTMLElement {
			constructor() {
				super();

				this.playBtn = this.querySelector('tpt-play-video');
				if (this.playBtn) {
					this.playBtn.addEventListener('click', this.playVideo.bind(this));
				}
			}

			playVideo() {
				if (this.playBtn.classList.contains('active')) {
					this.querySelector('.tpt-video-main').classList.remove('active');
					this.querySelector('.tpt-video-main').pause();
					this.querySelector('.tpt-video-main').muted = true;

					this.playBtn.classList.remove('active');

					return;
				} else {
					tptMutedAllVideo();

					document.querySelectorAll('tpt-play-video').forEach((playBtn) => {
						playBtn.classList.remove('active');
					});

					/**
					 * Pause all video
					 */
					if (this.closest('tpt-group-video[data-only-one-video="true"]')) {
						this.closest('tpt-group-video')
							.querySelectorAll('video')
							.forEach((video) => video.pause());
					}

					/**
					 * Set all video to default
					 */

					document.querySelectorAll('tpt-video-item').forEach((item) => {
						//if (!item.closest('tpt-group-video[data-only-one-video="true"]')) {
						item.classList.remove('loaded');
						//}

						if (item.querySelectorAll('video').length >= 2) {
							const videoMain = item.querySelector('.tpt-video-main');

							if (videoMain) {
								videoMain.classList.remove('active');
								videoMain.pause();
							}
						}
					});

					/**
					 * Active current item
					 */

					this.classList.add('loaded');
					this.querySelector('.tpt-video-main').classList.add('active');
					this.querySelector('.tpt-video-main').play();
					this.querySelector('.tpt-video-main').muted = false;

					this.playBtn.classList.add('active');

					/**
					 * Play all view preview other section
					 */

					if (!this.closest('tpt-group-video[data-only-one-video="true"]')) {
						const groupVideoOneTime = document.querySelectorAll('tpt-group-video[data-only-one-video="true"]');

						if (groupVideoOneTime) {
							groupVideoOneTime.forEach((group) => {
								const itemVideos = group.querySelectorAll('tpt-video-item');

								itemVideos.forEach((item) => {
									const videos = item.querySelectorAll('video');

									if (videos.length >= 2) {
										videos[0].play();
										videos[1].pause();
									} else if (videos.length == 1) {
										videos[0].play();
									}
								});
							});
						}
					}
				}
			}
		}
	);
}
