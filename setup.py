from setuptools import find_packages, setup

setup(
    name='budget',
    version='0.0.3',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'flask',
    ],
)